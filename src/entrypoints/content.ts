import phoneSVG from '../assets/phone.svg?raw';
import { HTMLButtonElement } from 'linkedom';

export default defineContentScript({
  matches: ['https://vision.meraki.com/n/*/video-walls/*'],

  async main(ctx) {
    function getDeviceSip(name: string) {
      const id = import.meta.env.PUBLIC_MERAKI_ORGANIZATION_ID;
      const query = new URLSearchParams({ name, 'productTypes[]': 'camera' });
      const headers = {
        'content-type': 'application/json',
        'authorization': `Bearer ${import.meta.env.PUBLIC_MERAKI_ACCESS_TOKEN}`
      };

      return fetch(
        import.meta.env.PUBLIC_PROXY_URL +
          `${import.meta.env.PUBLIC_MERAKI_API_URL}/organizations/${id}/devices?${query}`,
        { headers }
      )
        .then((r) => r.json())
        .then((r) => r?.[0]?.tags?.find((t: string) => t?.startsWith('webextel:')))
        .catch((e) => {
          console.error(e);
          return null;
        });
    }

    async function createCallButton(path: string, name: string, source: Element) {
      const newControl = source.cloneNode(true) as Element;
      const newControlSvg = newControl.querySelector('span > svg');
      newControlSvg?.setAttribute('viewBox', '0 0 24 24');
      newControlSvg?.querySelector('path')?.setAttribute('d', path);

      const webextel = await getDeviceSip(name);

      if (webextel != null) {
        (newControl as unknown as HTMLButtonElement).title = webextel;
        (newControl as unknown as HTMLButtonElement).onclick = () => (window.location = webextel);

        return newControl;
      }

      return null;
    }

    // The Vision Dashboard root node
    const root = document.getElementById('root')!;

    // SVG Path for the phone icon that we will try to add
    const phoneSvgPath = new DOMParser()
      .parseFromString(phoneSVG, 'image/svg+xml')
      .querySelector('path')!
      .getAttribute('d')!;

    // Observer which invokes our logic on DOM tree change
    const mutationObserver = new MutationObserver((mutations) =>
      Object.entries(
        mutations
          .map((m) => {
            const control = (m.addedNodes?.[0] as Element)?.querySelector(
              'div.react-grid-item button.ant-btn'
            );
            const name = control?.previousElementSibling
              ?.getAttribute('data-testid')
              ?.replace('video-wall-tile-', '');
            return name != null && control != null ? { [name]: control } : {};
          })
          .reduce((prev, curr) => {
            Object.assign(prev, curr);
            return prev;
          }, {})
      ).forEach(async ([name, control]) => {
        const callButton = await createCallButton(phoneSvgPath, name, control);
        if (callButton != null) control.after(callButton);
      })
    );

    // Observe the Vision Dashboard root node for changes
    mutationObserver.observe(root, { childList: true, subtree: true });
  }
});

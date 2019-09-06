export interface IDynamicScript {
  scr: string;
  opt?: IScriptLoaderOpt;
}
export type IScriptLoaderOpt = Partial<I_SCRIPT_LOADER_CONFIG_RAW>;

interface I_SCRIPT_LOADER_CONFIG_RAW {
  async: boolean;
  attrs: object;
  type: 'text/javascript' | string;
}

const DEFAULTS: IScriptLoaderOpt = {
  async: true,
  attrs: {},
  type: 'text/javascript',
};

export function scriptLoader(
  dynamicScripts: IDynamicScript[],
  hostElement: HTMLElement,
  doc = document,
) {
  // where to attach the script tag
  hostElement =
    hostElement ||
    doc.getElementsByTagName('head')[0] ||
    doc.getElementsByTagName('body')[0];
  if (!hostElement) {
    throw new Error('No <head> or <body> or custom tags found.');
  }

  // get all loaded scripts
  const allScriptsTags = doc.getElementsByTagName('script');
  const allLoadedScripts: string[] = [];
  {
    let i = 0;
    for (; i < allScriptsTags.length; i++) {
      const src = allScriptsTags[i].getAttribute('src');
      if (src) {
        allLoadedScripts.push(src);
      }
    }
  }

  const loadPromises: Array<Promise<any>> = [];
  // load said scripts
  for (const src of dynamicScripts) {
    if (allLoadedScripts.indexOf(src.scr) >= 0) {
      continue;
    }
    loadPromises.push(loadScript(src, hostElement, doc));
  }

  return Promise.all(loadPromises);
}

function loadScript(
  src: IDynamicScript,
  hostElement: HTMLElement,
  doc: Document,
) {
  return new Promise(resolve => {
    const node = doc.createElement('script');

    // Set Attributes
    setAttributes(node, src.opt);

    hostElement.appendChild(node);

    // after load events
    // cross browser handling of onLoaded event
    if ((node as any).readyState) {
      // IE
      (node as any).onreadystatechange = () => {
        if (
          (node as any).readyState === 'loaded' ||
          (node as any).readyState === 'complete'
        ) {
          (node as any).onreadystatechange = null;
          return resolver();
        }
      };
    } else {
      // Others
      node.onload = function() {
        return resolver();
      };
    }

    // node.src = src;
    node.setAttribute('src', src.scr);

    function resolver() {
      console.log(node);
      return resolve();
    }
  });
}

function setAttributes(
  node: HTMLScriptElement,
  opt: IScriptLoaderOpt = DEFAULTS,
) {
  const mergedOpt = Object.assign({}, opt, DEFAULTS);

  if (mergedOpt.async) {
    node.setAttribute('async', '');
  }
  if (mergedOpt.type) {
    node.setAttribute('type', mergedOpt.type);
  }

  Object.entries(mergedOpt.attrs || {}).forEach(entries => {
    node.setAttribute(...entries);
  });

  return node;
}

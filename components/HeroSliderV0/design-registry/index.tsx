import DesignText1, { type DesignText1Props } from './DesignText1';
import DesignText2, { type DesignText2Props } from './DesignText2';
import DesignText3, { type DesignText3Props } from './DesignText3';

const designRegistry = {
  DesignText1,
  DesignText2,
  DesignText3,
};

export type DesignRegistryComponentName = keyof typeof designRegistry;

export type DesignRegistryPayload =
  | ({ component: 'DesignText1' } & DesignText1Props)
  | ({ component: 'DesignText2' } & DesignText2Props)
  | ({ component: 'DesignText3' } & DesignText3Props);

type DesignRegistryRendererProps = {
  payload?: DesignRegistryPayload;
};

function DesignRegistryRenderer({ payload }: DesignRegistryRendererProps) {
  if (!payload) {
    return null;
  }

  const { component: componentName, ...componentProps } = payload;
  const Component = designRegistry[componentName];

  if (!Component) {
    return null;
  }

  return <Component {...componentProps} />;
}

export default DesignRegistryRenderer;
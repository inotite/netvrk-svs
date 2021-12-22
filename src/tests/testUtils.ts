import { ReactElement } from 'react';

import { render, RenderResult } from '@testing-library/react';

const Providers = (props: { children: JSX.Element }) => {
  return props.children;
};

const customRender = (ui: ReactElement, options = {}): RenderResult => {
  return render(ui, { wrapper: Providers, ...options });
};

export * from '@testing-library/react';

export { customRender as render };

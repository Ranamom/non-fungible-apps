import { NavBar } from '@/components';

import { PageStyles as PS } from './page.styles';

export type AppPageProps = {
  children: React.ReactNode;
};

export const AppPage: React.FC<AppPageProps> = ({ children }: AppPageProps) => {
  return (
    <PS.Container>
      <NavBar />
      <PS.Content as="main">{children}</PS.Content>
    </PS.Container>
  );
};

AppPage.displayName = 'AppPage';
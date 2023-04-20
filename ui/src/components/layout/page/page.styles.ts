import { styled } from '@/theme';

export abstract class PageStyles {
  public static readonly Container = styled('div', {
    minHeight: '100vh',
    position: 'relative',
  });

  public static readonly Content = styled('div', {
    width: '100%',
    minHeight: '85vh',
    maxWidth: '$7xl',
    margin: '0 auto',
    display: 'grid',
  });
}
import { Link, LinkProps } from 'expo-router';
import { Platform } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';

type Props = Omit<LinkProps, 'href'> & {
  href: LinkProps['href']; // strict typing from expo-router
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      href={href}
      {...rest}
      onPress={async (event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          await openBrowserAsync(href as string); // force string for external URLs
        }
      }}
    />
  );
}

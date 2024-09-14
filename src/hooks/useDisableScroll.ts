import { useEffect } from 'react';

const useDisableScroll = (isDisabled: boolean) => {
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0];
    if (isDisabled) {
      html && (html.style.overflow = 'hidden');
    } else {
      html && (html.style.overflow = 'auto');
    }

    return () => {
      html && (html.style.overflow = 'auto');
    };
  }, [isDisabled]);
};

export default useDisableScroll;

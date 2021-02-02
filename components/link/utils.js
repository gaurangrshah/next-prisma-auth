
import { useRouter } from 'next/router';

export const useIsActive = (href) => {
  // user router to find out if current route is the active route
  const router = useRouter();
  return router && router.pathname === href;
};



// check if link is external
export const external = (href) => href.startsWith('http');

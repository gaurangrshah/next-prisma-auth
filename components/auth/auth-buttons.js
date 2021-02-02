// import React from 'react';
// import { Button } from '@chakra-ui/react';
// import { signIn, signOut, useSession } from 'next-auth/client';
// import { SimpleNextButtonLink } from '@/chakra/components';

// export const AuthButton = ({isAuthenticated}) => {
// const [session] = useSession();
// console.log('SESSION', session);
//    const handleLogin = (e) => {
//     e.preventDefault();
//     console.log('signin before');
//     signIn();
//     console.log('signin after');
//    };

//   const handleLogout = (e) => {
//     e.preventDefault();
//     signOut();
//   };


//   return !session ? (
//     <Button onClick={handleLogin}>
//       {'Login'}
//     </Button>
//   ) : (
//     <Button onClick={handleLogout}>
//       {'Logout'}
//     </Button>
//   );
// };



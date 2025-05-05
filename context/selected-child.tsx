'use client';

import { createContext, useContext, useState } from 'react';

// 1. Define the shape of your child object
type Child = {
  id: string;
  name: string;
  // add other fields as needed
};

// 2. Define the context shape
type ChildContextType = {
  selectedChild: Child;
  setSelectedChild: (child: Child) => void;
  allChildren: Child[];
};

// 3. Create the context with a fallback that will error if used outside the provider
const ChildContext = createContext<ChildContextType | undefined>(undefined);


export type User = {
  products: { id: string, name: string }[]
  // extend with more fields as needed
};

type UserContextType = {
  products: { id: string, name: string }[]
  // extend with more fields as needed
};

// Context for user
// type UserContextType = {
//   user: User;
// };
const UserContext = createContext<User | undefined>(undefined);

// // 4. Provider component
// export function ChildProvider({
//   children,
//   initialChildren,
// }: {
//   children: React.ReactNode;
//   initialChildren: Child[];
// }) {
//   const [selectedChild, setSelectedChild] = useState<Child>(initialChildren[0]);

//   return (
//     <ChildContext.Provider value={{ selectedChild, setSelectedChild, allChildren: initialChildren }}>
//       {children}
//     </ChildContext.Provider>
//   );
// }

// 5. Hook to use the context
export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error('useChild must be used within an OnboardedProvider');
  }
  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within an OnboardedProvider');
  }
  return context;
};


import { useEffect } from 'react';



export function OnboardedProvider({
  children,
  initialChildren,
  user,
}: {
  children: React.ReactNode;
  initialChildren: Child[];
  user: User;
}) {
  const [selectedChild, setSelectedChildState] = useState<Child | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('selectedChild');
    if (stored) {
      setSelectedChildState(JSON.parse(stored));
    } else {
      setSelectedChildState(initialChildren[0]);
    }
  }, [initialChildren]);

  const setSelectedChild = (child: Child) => {
    localStorage.setItem('selectedChild', JSON.stringify(child));
    setSelectedChildState(child);
  };

  if (!selectedChild) return null; // or a loading spinner

  return (
    <UserContext.Provider value={user}>
      <ChildContext.Provider value={{ selectedChild, setSelectedChild, allChildren: initialChildren }}>
        {children}
      </ChildContext.Provider>
    </UserContext.Provider>
  );
}


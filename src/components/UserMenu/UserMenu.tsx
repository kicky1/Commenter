import { Group, Select, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { forwardRef, Suspense, useEffect, useState } from "react";
import { fetchUsers } from "../../utils/api/userAPI";
import { setPokedUser, useUserMenuStore } from "../../zustand/useUserMenuStore";



interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    email: string;
    name: string;
    label: string;
    uid: string;
  }
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({name, email, label, uid, ...others }: ItemProps, ref) => (
      <div key={uid} ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text size="sm">{label}</Text>
            <Text size="xs" opacity={0.65}>
              {email}
            </Text>
          </div>
        </Group>
      </div>
    )
  );


  function UserMenu() { 
    const largeScreen = useMediaQuery('(min-width: 900px)');
    const [userBase, setUserBase] = useState<any>([]);
    const [poked, setPoked] = useState<string | null>(null)
    const pokedUser = useUserMenuStore((state) => state.pokedUser)
    
    useEffect(() => {
        setPokedUser(poked)
        console.log(poked)
      }, [poked]);

  
    useEffect(() => {
      const fetchData = async () => {
         await fetchUsers().then((res) => {
          return setUserBase(res)
        });
      };
      fetchData();  
    }, []);
 

    return(
      <Suspense
        fallback={'Loading...'}
      >
    <Select
        pt={largeScreen ? 20 : 0}
        pb={10}
        size='md'
        label="Wybierz użytkownika"
        placeholder="Wybierz"
        itemComponent={SelectItem}
        data={userBase}
        maxDropdownHeight={400}
        nothingFound="Nobody here"
        value={pokedUser}
        onChange={setPoked} />
  
      </Suspense>
    )
  }

  export default UserMenu
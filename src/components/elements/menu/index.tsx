import Link from 'next/link';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useQueries } from '@/components/hooks/useQueries';
import Cookies from 'js-cookie';
import { useMutation } from '@/components/hooks/useMutation';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export const MenuPage = () => {
  const router = useRouter()
  const { data } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })
  const { mutate } = useMutation();

  const handleLogout = async () => {
    const response = await mutate({
      prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Cookies.get('user_token')}`
      }
    })


    if (!response?.result?.success) {
      console.log(response)
      toast.error("gagal logout")
    } else {
      Cookies.remove("user_token")
      toast.success("Berhasil Logout!")
      router.push('/login')
    }
  };


  return (
    <><div className="flex mx-4 gap-8 items-center">
      <Link href='/' className="w-1/3 w-full font-bold">
        Raniaarn's App
      </Link>
      <Link href='/users' className="3-1/3  ">
        Users
      </Link>
      <Link href='/profile' className="3-1/3 ">
        Profile
      </Link>
      <Link href='/notes' className="3-1/3  ">
        Notes
      </Link>
      <div className="3-1/3 text-black ">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {data?.data?.name}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div >
    </>
  )
}
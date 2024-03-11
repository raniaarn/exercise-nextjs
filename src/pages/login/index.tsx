import { Flex, Stack, Heading, FormControl, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import { useMutation } from "@/components/hooks/useMutation"
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'
import { useRouter } from "next/router";

export default function Login() {
  const { mutate } = useMutation()
  const router = useRouter()
  const [payload, setPayload] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async () => {
    const response = await mutate({
      prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload,
    })

    if (!response?.result?.success) {
      toast.error("Login Gagal")
    } else {
      Cookies.set('user_token',
        response?.result?.data?.token,
        { expires: new Date(response?.result?.data?.expires_at),
        path: "/" })
      toast.success("Berhasil Login!")
    }
    router.push('/');
  }

  return (
    <>
      <Flex alignItems="center" justifyContent="center">
        <Stack direction="column">
          <Heading as="h4">
            Login
          </Heading>
          <FormControl>
            <Input
              value={payload?.email}
              onChange={(event) => setPayload({ ...payload, email: event.target.value })}
              placeholder="email"
            />
          </FormControl>
          <FormControl>
            <Input
              value={payload?.password}
              onChange={(event) => setPayload({ ...payload, password: event.target.value })}
              placeholder="password"
              type="password"
            />
          </FormControl>
          <FormControl>
            <Button
              onClick={() => handleSubmit()}>
              Login
            </Button>
          </FormControl>
        </Stack>
      </Flex>
    </>
  )
}
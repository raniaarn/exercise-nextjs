import dynamic from "next/dynamic";
import { Grid, GridItem, Text, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from 'react-hot-toast';
import { useMutation } from "@/components/hooks/useMutation";

const LayoutComponent = dynamic(
  () => import('@/layout').then(mod => mod.Layout)
);

export default function AddNotes() {
  const { mutate } = useMutation()
  const router = useRouter()
  const [notes, setNotes] = useState({
    title: "",
    description: ""
  })

  const HandleSubmit = async () => {
    const response = await mutate({
      prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
      payload: notes,
    })
    toast.success("Berhasil menambahkan notes!")
    router.push('/notes')
  }

  return (
    <LayoutComponent metaTitle="Notes" metaDescription="Welcome to Raniaarn's App">
      <div className="px-2 pt-8 text-lg font-bold">
        Add Notes
      </div>
      <div>
        <Grid gap={5}>
          <GridItem>
            <Text>Title</Text>
            <Input type="text" onChange={(event) => setNotes({ ...notes, title: event.target.value })} />
          </GridItem>
          <GridItem>
            <Text>Description</Text>
            <Textarea onChange={(event) => setNotes({ ...notes, description: event.target.value })} />
          </GridItem>
          <GridItem>
            <Button onClick={() => HandleSubmit()} colorScheme="purple">Submit</Button>
          </GridItem>
        </Grid>
      </div>
    </LayoutComponent>
  )
}

// export async function getStaticProps() {
//   const res = await fetch('https://paace-f178cafcae7b.nevacloud.io/api/notes');
//   const data = await res.json()
//   return { props: { data }, revalidate: 10 }
// }
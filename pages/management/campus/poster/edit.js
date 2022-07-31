import PosterEdit from '@components/Management/Campus/Poster/PosterEdit';
import { useRouter } from "next/router";

export default function() {
  const router = useRouter();
  return (
    <PosterEdit
      id={ router.query.id }
    />
  )
}

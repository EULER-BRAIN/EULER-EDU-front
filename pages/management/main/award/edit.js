import AwardEdit from '@components/Management/Main/Award/AwardEdit';
import { useRouter } from "next/router";

export default function() {
  const router = useRouter();
  return (
    <AwardEdit
      id={ router.query.id }
    />
  )
}

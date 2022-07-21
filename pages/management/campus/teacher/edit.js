import TeacherEdit from "@components/Management/Campus/Teacher/TeacherEdit";
import { useRouter } from "next/router";

export default function() {
  const router = useRouter();
  return (
    <TeacherEdit
      id={ router.query.id }
    />
  )
}

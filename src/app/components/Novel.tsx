import { Novel } from "@prisma/client";

type Props = {
  novel: Novel;
};

export default function Novel({ novel }: Props) {
  return (
    <>
      <p>Novel Title: {novel.title}</p>
      <p>Novel Introduction: {novel.introduction}</p>
    </>
  );
}

import { AuthorTypes } from "../../../typings";
import Novel from "./Novel";

type Props = {
  author: AuthorTypes;
};

export default function Author({ author }: Props) {
  return (
    <>
      <h3>{author.name}</h3>
      <div>{author.numberOfNovels}</div>
      {author.novels.map((novel) => {
        return <Novel novel={novel} />;
      })}
    </>
  );
}

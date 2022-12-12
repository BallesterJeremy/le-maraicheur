import LeftSlide from "@components/Leftslide";
import TeamPost from "@components/TeamPost";
import Topslide from "@components/Topslide";

export default function AdminMethode() {
  return (
    <section className="background-home">
      <LeftSlide />
      <Topslide />
      <div className="position-admin--editor">
        <div className="background-texteditor">
          <TeamPost />
        </div>
      </div>
    </section>
  );
}

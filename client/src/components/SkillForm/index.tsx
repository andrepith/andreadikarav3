import Image from "next/image";

interface skillInterface {
  _id: string;
  name: string;
  image: string;
  link: string;
}

const SkillForm = ({ bio }: any) => {
  return (
    <section>
      <div className="skillform container">
        <div className="bio-section-title">Skills</div>
        <div className="skillform__items">
          {bio.skillset.map(({ _id, name, image, link }: skillInterface) => (
            <div className="skillform-card" key={_id}>
              <div className="skillform__image">
                <Image src={image} alt={`${name}-image`} layout="fill" />
              </div>
              <div className="btn-action">
                <i className="fa fa-edit" />
                <i className="fa fa-trash" />
                <a href={link} target="__blank">
                  <i className="fa fa-arrow-right-from-bracket" />
                </a>
              </div>
            </div>
          ))}
          <div className="skillform-card">
            <div className="skillform-card__add">
              <i className="fa fa-plus toggle_add" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillForm;

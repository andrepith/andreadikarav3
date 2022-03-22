import Image from "next/image";
import bioInterface from "@/lib/Types";

const Skillset = ({ bio }: bioInterface) => {
  return (
    <section className="justify-content-start skillset" id="skills">
      <div className="container">
        <h2 className="section-title text-center">Featured Skillset.</h2>
        <div className="logo-container mt-4">
          {bio.skillset.map((item, key) => (
            <div className="logo-wrapper" key={key}>
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                className="logo"
                objectFit="contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skillset;

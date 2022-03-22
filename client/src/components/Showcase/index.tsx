import React from "react";
import Image from "next/image";
import bioInterface from "@/lib/Types";

const Showcase = ({ bio }: bioInterface) => {
  return (
    <section className="justify-content-start showcase" id="project">
      <div className="container">
        <h2 className="section-title text-center">Project.</h2>
        <div className="row">
          {bio.portofolio.map((item, key) => (
            <div className="col-lg-6 col-sm-12 mt-3 showcase-cards" key={key}>
              <a href={item.url} target="__blank" className="showcase-card">
                <Image
                  className="showcase-image image"
                  src={item.image}
                  alt={item.alt}
                  layout="fill"
                />
                <div className="image-overlay">
                  <div className="image-overlay-text">
                    <p className="project-company mb-0">{item.name}</p>
                    <p className="project-title">{item.type}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Showcase.displayName = "Showcase";

export default Showcase;

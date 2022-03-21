import React from "react";

interface portofolioInterface {
  _id: string;
  url: string;
  image: string;
  alt: string;
  name: string;
  type: string;
}

const PortofolioForm = ({ bio }: any) => {
  return (
    <section>
      <div className="portofolio container">
        <div className="bio-section-title">Portofolio</div>
        <div className="portofolio-items">
          {bio.portofolio.map(
            ({ _id, url, image, name, type }: portofolioInterface) => (
              <div className="portofolio-item" key={_id}>
                <div className="portofolio-card">
                  <div>{name}</div>
                  <div>{type}</div>
                  <div className="btn-action">
                    <a href={image} target="__blank">
                      <i className="fa fa-image" />
                    </a>
                    <i className="fa fa-edit" />
                    <i className="fa fa-trash" />
                    <a href={url} target="__blank">
                      <i className="fa fa-arrow-right-from-bracket" />
                    </a>
                  </div>
                </div>
              </div>
            )
          )}
          <div className="portofolio-item__add">
            <div className="portofolio-card">
              <i className="fa fa-plus toggle_add" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortofolioForm;

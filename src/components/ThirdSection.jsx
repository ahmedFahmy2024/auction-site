import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import "../css/cardinfo.css";
import { useUser } from "../contexts/UserProvider";
import StartChat from "./StartChat";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2";

export default function ThirdSection({ scraps }) {
  const { t, i18n } = useTranslation();
  const { user } = useUser();

  const hideIt = scraps?.user_id === user?.id;

  return (
    <div className="complain">
      <div className="firstbox">
        <div className="info">
          <div className="card">
            <div className="card-title">
              <div className="image-profile">
                <Avatar
                  alt={scraps?.user?.name || scraps?.name}
                  src={scraps?.user?.profile_image || scraps?.image}
                  sx={{ width: 96, height: 96 }}
                />
              </div>
              <h6>{scraps?.user?.name || scraps?.name}</h6>
              <p className="job-title">{t(scraps?.user?.account_type)}</p>
              {!hideIt && <StartChat scraps={scraps} />}
            </div>
            <h3>{t("Informations")}</h3>
            <div className="card-content">
              <div className="stacks">
                <Icon icon="fluent:mail-24-filled" width="22" height="22" />
                <h6>
                  <a
                    style={{ fontSize: "1rem", color: "rgb(33, 43, 54)" }}
                    target="_blank"
                    rel="noreferrer"
                    href={`mailto:${scraps?.user?.email || scraps?.email}`}
                  >
                    {scraps?.user?.email || scraps?.email}
                  </a>
                </h6>
              </div>
              <div className="stacks">
                <Icon icon="ph:phone-list-fill" width="22" height="22" />
                <h6>
                  <a
                    style={{ fontSize: "1rem", color: "rgb(33, 43, 54)" }}
                    target="_blank"
                    rel="noreferrer"
                    href={`tel:+${scraps?.user?.phone || scraps?.phone}`}
                  >
                    {scraps?.user?.phone || scraps?.phone}
                  </a>
                </h6>
              </div>
              {
                scraps?.user && (
                  <>
                    <div className="stacks">
                      <Icon icon="mingcute:location-fill" width="22" height="22" />
                      <h6>{t(scraps?.user?.country)}</h6>
                    </div>
                    <div className="stacks">
                      <Icon icon="mingcute:location-fill" width="22" height="22" />
                      <h6>{t(scraps?.user?.state)}</h6>
                    </div>
                  </>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

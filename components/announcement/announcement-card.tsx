import parse from "html-react-parser";
import React from "react";
import dayjs from "dayjs";

import { IAnnouncement } from "@/types/announcement";
import { classNames } from "@/libs";

const AnnouncementCard = ({
  announcement,
}: {
  announcement: IAnnouncement;
}) => {
  return (
    <div
      className={classNames(
        "bg-neutral-20 dark:bg-neutral-gray",
        "flex flex-col gap-2",
        "rounded-lg p-2"
      )}
    >
      <small className="text-xs text-neutral-40 dark:text-neutral-30 text-right">
        {dayjs(announcement.createdAt).format("DD/MM/YYYY - hh:mm a")}
      </small>
      <p className="text-base font-medium">{announcement.title}</p>

      <div className="text-sm parseContent">
        {parse(announcement?.details ?? "")}
      </div>
    </div>
  );
};

export default AnnouncementCard;

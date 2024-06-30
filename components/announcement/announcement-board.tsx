import React, { ReactNode, useState } from "react";

import { Modal } from "@/components";
import useAnnouncements from "@/hooks/useAnnouncements";
import AnnouncementCard from "./announcement-card";

interface AnnouncementBoardProps {
  children: (props: { proceed: () => void }) => ReactNode;
}

const AnnouncementBoard = ({ children }: AnnouncementBoardProps) => {
  const [show, setShow] = useState<boolean>(false);

  const { data, isLoading, error } = useAnnouncements();
  console.log(data);

  return (
    <>
      {children({ proceed: () => setShow(true) })}
      <Modal
        {...{ show }}
        size="sm"
        onHide={() => {
          setShow(false);
        }}
        header="Announcements"
        className="p-2"
      >
        <div className="flex flex-col gap-4">
          {data?.docs.map((announcement, i) => (
            <AnnouncementCard {...{ announcement }} key={i} />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default AnnouncementBoard;

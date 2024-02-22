import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

interface TimelineObject {
  index: number;
  event: string;
  icon: string;
  date: string;
  content: string;
  contentIcon: string | StaticImport;
}

function Timeline({ events }: { events: Array<TimelineObject> }) {
  return (
    <VerticalTimeline>
      {events.map((event, index) =>
        event.content ? (
          <VerticalTimelineElement
            key={`timeline_event_${index}`}
            className=""
            icon={
              <Image
                alt={event.event}
                src={event.icon}
                width={20}
                height={20}
              />
            }
          >
            <h4 className="text-xl font-semibold">{event.event}</h4>
            <div className="grid grid-cols-4 gap-4 mt-2">
              <div className="col-span-1 bg-white">
                <Image
                  alt={event.event}
                  src={event.contentIcon}
                  width={20}
                  height={20}
                  className="max-w-full h-auto"
                />
              </div>
              <div className="col-span-3 p-4 flex items-center">
                <p className="text-base">{event.content}</p>
              </div>
            </div>
          </VerticalTimelineElement>
        ) : (
          <VerticalTimelineElement
            key={`timeline_event_${index}`}
            date={event.date}
            icon={
              <Image
                alt={event.event}
                src={event.icon}
                width={20}
                height={20}
              />
            }
          ></VerticalTimelineElement>
        )
      )}
    </VerticalTimeline>
  );
}

export default Timeline;

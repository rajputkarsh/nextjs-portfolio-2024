import Timeline from "@/components/timeline";
import config from "@/constants/config";
import EDUCATION_TIMELINE from "@/constants/education";

function EducationTimeline() {
  return (
    <div className="w-full">
      <Timeline events={EDUCATION_TIMELINE} />
    </div>
  );
}

export default EducationTimeline;

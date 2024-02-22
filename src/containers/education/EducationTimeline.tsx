import Timeline from "@/components/timeline";
import config from "@/constants/config";
import EDUCATION_TIMELINE from "@/constants/education";

function EducationTimeline() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h4 className="text-center text-4xl font-semibold text-theme-color underline-animation my-8">
        {config.educationTimelineTitle}
      </h4>
      <Timeline events={EDUCATION_TIMELINE} />
    </div>
  );
}

export default EducationTimeline;

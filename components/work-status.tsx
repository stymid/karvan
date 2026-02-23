import { Chip } from "@heroui/chip";

export const WORK_STATUS = {
  open_to_work: {
    label: "آماده‌ به کار",
    chipColor: "success",
    dotClass: "bg-success",
    order: 1,
  },
  busy: {
    label: "مشغول",
    chipColor: "warning",
    dotClass: "bg-warning",
    order: 2,
  },
  resting: {
    label: "استراحت",
    chipColor: "secondary",
    dotClass: "bg-secondary",
    order: 3,
  },
  inactive: {
    label: "غیرفعال",
    chipColor: "default",
    dotClass: "bg-default-400",
    order: 4,
  },
} as const;
export type StatusWork = "open_to_work" | "busy" | "resting" | "inactive";
const WorkStatus = ({ status }: { status: StatusWork }) => {
  return (
    <div className="flex gap-4">
      <Chip color={WORK_STATUS[status].chipColor} variant="faded">
        {WORK_STATUS[status].label}
      </Chip>
    </div>
  );
};

export default WorkStatus;

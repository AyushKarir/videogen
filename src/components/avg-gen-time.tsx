import { Badge } from "@/components/ui/badge";
type Props = {
    eta: number;
};

const AvgGenTime = ({ eta }: Props) => {
    return (
        <div className="text-xs flex items-center gap-2 absolute p-2 right-0">
            Average Generation Time:{" "}
            <Badge variant={"secondary"} className="whitespace-nowrap">
                {eta} Sec
            </Badge>
        </div>
    );
};

export default AvgGenTime;

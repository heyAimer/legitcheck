import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

export default function RiskCategoryBreakdown({ categories }) {
  return (
    <section className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">
        Risk Breakdown
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[75%]">Category</TableHead>
            <TableHead>Risk Level</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.key} className="">
              <TableCell className="whitespace-normal break-words">
                {cat.key}
              </TableCell>

              <TableCell>
                <Badge
                  className={
                    cat.level === "HIGH"
                      ? "bg-red-200/10 text-red-600 border-red-500/20"
                      : cat.level === "MEDIUM"
                      ? "bg-yellow-200/10 text-yellow-600 border-yellow-500/20"
                      : "bg-green-200/10 text-green-600 border-green-500/20"
                  }
                >
                  {cat.level}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}

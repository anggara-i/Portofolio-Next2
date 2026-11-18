import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SkillCard({ nama, level }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-bold text-primary">{nama}</CardTitle>
                <Badge variant="outline">Level: {level}</Badge>
            </CardHeader>
        </Card>
    );
}
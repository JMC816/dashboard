import { Company } from "../companies";
import { Post } from "./posts";

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", source: "gasoline", emissions: 120 },
      { yearMonth: "2024-02", source: "lpg", emissions: 110 },
      { yearMonth: "2024-03", source: "diesel", emissions: 95 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", source: "gasoline", emissions: 80 },
      { yearMonth: "2024-02", source: "lpg", emissions: 105 },
      { yearMonth: "2024-03", source: "diesel", emissions: 120 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceUid: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update",
  },
];

export const countries = Array.from(
  new Set(companies.map((c) => c.country))
).map((code) => ({
  code,
  name: code, // 혹은 코드별 실제 이름 매핑 가능
}));

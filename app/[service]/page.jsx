export const dynamicParams = true;
import { notFound } from "next/navigation";

const services = [
  {
    id: 1,
    name: "Graphics Design",
    slug: "graphics-design",
  },
  {
    id: 2,
    name: "UI/UX Design",
    slug: "ui-ux-design",
  },
  {
    id: 3,
    name: "Web Development",
    slug: "web-development",
  },
  {
    id: 4,
    name: "Digital Marketing",
    slug: "digital-marketing",
  },
];

export async function generateStaticParams() {
  // generate static pages for each service
  return services.map((service) => ({ service: service.slug }));

  // [{ service: "graphics-design" }, { service: "ui-ux-design" }]
}

export default function ServicePage({ params }) {
  const service = services.find((service) => service.slug === params.service);
  if (!service) {
    return notFound();
  }
  return (
    <div>
      <h2>{service.name}</h2>
    </div>
  );
}

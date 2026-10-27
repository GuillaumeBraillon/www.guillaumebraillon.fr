import { jsPDF } from "jspdf";
import { profile, skills, experiences, educations } from "../data/cv";
import { contactLinks } from "../data/site";

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 16;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const COLORS = {
  navy: [31, 55, 82] as const,
  blue: [9, 105, 218] as const,
  ink: [31, 35, 40] as const,
  muted: [87, 96, 106] as const,
  line: [208, 215, 222] as const,
  pale: [246, 248, 250] as const,
  paleBlue: [239, 246, 255] as const,
  white: [255, 255, 255] as const,
};

function createCvPdf() {
  const pdf = new jsPDF({ format: "a4", unit: "mm" });
  let y = MARGIN;

  const setTextColor = (color: readonly [number, number, number]) =>
    pdf.setTextColor(color[0], color[1], color[2]);

  const drawPageHeader = (firstPage = false) => {
    pdf.setFillColor(...COLORS.white);
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, "F");

    if (firstPage) {
      pdf.setFillColor(...COLORS.navy);
      pdf.rect(0, 0, PAGE_WIDTH, 43, "F");
      pdf.setFillColor(...COLORS.blue);
      pdf.rect(0, 43, PAGE_WIDTH, 1.5, "F");

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(23);
      setTextColor(COLORS.white);
      pdf.text(profile.name, MARGIN, 16);

      pdf.setFontSize(10.5);
      setTextColor([190, 220, 255]);
      pdf.text(profile.title, MARGIN, 23);

      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8.5);
      setTextColor([222, 230, 239]);
      pdf.text(profile.subtitle, MARGIN, 29);

      const contactGap = 3;
      const contactWidth =
        (CONTENT_WIDTH - contactGap * (contactLinks.length - 1)) / contactLinks.length;
      contactLinks.forEach((link, index) => {
        const x = MARGIN + index * (contactWidth + contactGap);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(7.5);
        setTextColor([177, 202, 230]);
        pdf.text(link.label.toLocaleUpperCase("fr-FR"), x, 36);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.2);
        setTextColor(COLORS.white);
        pdf.text(link.value, x, 40);
        pdf.link(x, 34, contactWidth, 8, { url: link.href });
      });

      y = 52;
      return;
    }

    pdf.setDrawColor(...COLORS.line);
    pdf.setLineWidth(0.25);
    pdf.line(MARGIN, 15, PAGE_WIDTH - MARGIN, 15);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    setTextColor(COLORS.muted);
    pdf.text(profile.name, MARGIN, 11);
    pdf.setFont("helvetica", "normal");
    pdf.text("CURRICULUM VITAE", PAGE_WIDTH - MARGIN, 11, { align: "right" });
    y = 23;
  };

  const addPage = () => {
    pdf.addPage();
    drawPageHeader();
  };

  const ensureSpace = (height: number) => {
    if (y + height > PAGE_HEIGHT - MARGIN - 12) addPage();
  };

  const measureText = (text: string, size: number, width: number, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(text, width) as string[];
    return { lines, height: lines.length * (size * 0.48) };
  };

  const addSection = (title: string) => {
    ensureSpace(11);
    y += 3;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    setTextColor(COLORS.ink);
    pdf.text(title.toLocaleUpperCase("fr-FR"), MARGIN, y + 3);
    pdf.setDrawColor(...COLORS.line);
    pdf.setLineWidth(0.3);
    pdf.line(MARGIN, y + 5, PAGE_WIDTH - MARGIN, y + 5);
    pdf.setFillColor(...COLORS.blue);
    pdf.roundedRect(MARGIN, y + 4.45, 12, 1.1, 0.5, 0.5, "F");
    y += 11;
  };

  const addFooter = () => {
    const pageCount = pdf.getNumberOfPages();
    for (let page = 1; page <= pageCount; page += 1) {
      pdf.setPage(page);
      pdf.setDrawColor(...COLORS.line);
      pdf.setLineWidth(0.25);
      pdf.line(MARGIN, PAGE_HEIGHT - 13, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 13);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      setTextColor(COLORS.muted);
      pdf.text(profile.website, MARGIN, PAGE_HEIGHT - 8);
      pdf.text(`${page} / ${pageCount}`, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 8, {
        align: "right",
      });
    }
  };

  const addExperience = (experience: (typeof experiences)[number]) => {
    const cardX = MARGIN;
    const cardWidth = CONTENT_WIDTH;
    const textX = cardX + 5;
    const textWidth = cardWidth - 10;
    const role = measureText(experience.role, 10, textWidth, true);
    const description = measureText(experience.description, 8.8, textWidth);
    const cardHeight = role.height + description.height + 14;
    ensureSpace(cardHeight + 2);

    pdf.setFillColor(...COLORS.pale);
    pdf.roundedRect(cardX, y, cardWidth, cardHeight, 1.5, 1.5, "F");
    pdf.setFillColor(...COLORS.blue);
    pdf.roundedRect(cardX, y, 1.2, cardHeight, 0.5, 0.5, "F");

    let textY = y + 6;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    setTextColor(COLORS.ink);
    pdf.text(role.lines, textX, textY);
    textY += role.height + 2;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    setTextColor(COLORS.blue);
    pdf.text(`${experience.company}  |  ${experience.period}`, textX, textY);
    textY += 4;

    pdf.setFontSize(8.8);
    pdf.setLineHeightFactor(1.25);
    setTextColor(COLORS.muted);
    pdf.text(description.lines, textX, textY);
    pdf.setLineHeightFactor(1.15);
    y += cardHeight + 4;
  };

  const addEducation = (education: (typeof educations)[number]) => {
    const title = `${education.title}  |  ${education.year}`;
    const titleLines = measureText(title, 9.2, CONTENT_WIDTH - 10, true);
    const detailLines = measureText(education.details, 8.5, CONTENT_WIDTH - 10);
    const cardHeight = titleLines.height + detailLines.height + 10;
    ensureSpace(cardHeight + 2);

    pdf.setDrawColor(...COLORS.line);
    pdf.setLineWidth(0.25);
    pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, cardHeight, 1.3, 1.3, "S");
    let textY = y + 4.5;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.2);
    setTextColor(COLORS.ink);
    pdf.text(titleLines.lines, MARGIN + 5, textY);
    textY += titleLines.height + 0.5;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    setTextColor(COLORS.blue);
    pdf.text(education.institution, MARGIN + 5, textY);
    textY += 3.8;
    pdf.setFontSize(8.5);
    setTextColor(COLORS.muted);
    pdf.text(detailLines.lines, MARGIN + 5, textY);
    y += cardHeight + 2;
  };

  const addSkillGroup = (title: string, list: string[]) => {
    const labelHeight = 4;
    const chipHeight = 6.2;
    const chipGap = 2;
    const chipPadding = 2.2;
    const chipFontSize = 7.5;
    const chips: { label: string; x: number; width: number }[] = [];
    let chipX = MARGIN;
    let rows = 1;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(chipFontSize);
    for (const label of list) {
      const chipWidth = pdf.getTextWidth(label) + chipPadding * 2;
      if (chipX + chipWidth > PAGE_WIDTH - MARGIN) {
        chipX = MARGIN;
        rows += 1;
      }
      chips.push({ label, x: chipX, width: chipWidth });
      chipX += chipWidth + chipGap;
    }

    const groupHeight = labelHeight + rows * (chipHeight + 1.5) + 2;
    ensureSpace(groupHeight);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    setTextColor(COLORS.ink);
    pdf.text(title, MARGIN, y + 3);
    const chipsStartY = y + labelHeight + 1;

    let currentRow = 0;
    let previousX = MARGIN;
    for (const chip of chips) {
      if (chip.x < previousX) currentRow += 1;
      pdf.setFillColor(...COLORS.paleBlue);
      pdf.roundedRect(
        chip.x,
        chipsStartY + currentRow * (chipHeight + 1.5),
        chip.width,
        chipHeight,
        2,
        2,
        "F"
      );
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(chipFontSize);
      setTextColor(COLORS.blue);
      pdf.text(
        chip.label,
        chip.x + chipPadding,
        chipsStartY + currentRow * (chipHeight + 1.5) + 4.1
      );
      previousX = chip.x;
    }
    y += groupHeight;
  };

  drawPageHeader(true);
  addSection("Profil");
  const profileBlocks = profile.details
    .map((paragraph) =>
      paragraph
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/<a\b[^>]*>(.*?)<\/a>/g, "$1")
        .replace(/<[^>]+>/g, "")
    )
    .map((paragraph) => measureText(paragraph, 9, CONTENT_WIDTH - 10));
  const profileHeight = profileBlocks.reduce((height, block) => height + block.height, 0) + 20;
  ensureSpace(profileHeight);
  pdf.setFillColor(...COLORS.paleBlue);
  pdf.roundedRect(MARGIN, y, CONTENT_WIDTH, profileHeight, 1.5, 1.5, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setLineHeightFactor(1.25);
  setTextColor(COLORS.ink);
  let profileY = y + 6;
  for (const block of profileBlocks) {
    pdf.text(block.lines, MARGIN + 5, profileY);
    profileY += block.height + 3;
  }
  pdf.setLineHeightFactor(1.15);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  setTextColor(COLORS.blue);
  pdf.text(`Permis B  |  ${profile.lang}`, MARGIN + 5, y + profileHeight - 3);
  y += profileHeight + 2;

  addSection("Expériences professionnelles");
  experiences.forEach(addExperience);

  addPage();
  addSection("Formation et certifications");
  educations.forEach(addEducation);

  addSection("Compétences techniques");
  const skillGroups: [string, string[]][] = [
    ["Intelligence artificielle", skills.iaAuto],
    ["Outils de développement IA", skills.aiDevTools],
    ["Automatisation et IoT", skills.automation],
    ["Frontend", skills.frontend],
    ["Backend", skills.backend],
    ["Bases de données", skills.database],
    ["DevOps et outils", skills.devops],
  ];
  skillGroups.forEach(([title, list]) => addSkillGroup(title, list));

  addFooter();
  pdf.save("Guillaume-Braillon-CV.pdf");
}

document.getElementById("download-cv-pdf")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  if (!(button instanceof HTMLButtonElement)) return;
  button.disabled = true;
  button.textContent = "Préparation du PDF…";
  try {
    createCvPdf();
  } finally {
    button.disabled = false;
    button.textContent = "Télécharger le CV en PDF";
  }
});

import { jsPDF } from 'jspdf';
import normalBackground from '@/assets/pictures/hero-background-normal.png';

function generatePDF(hero) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'in',
  });
  const normalBackgroundImg = new Image();
  const HeroImg = new Image();
  normalBackgroundImg.src = normalBackground;
  HeroImg.src = hero.picture.url;
  doc.text(hero.name, 1, 1);
  doc.addImage(normalBackgroundImg, 'PNG', 1, 1, 5, 3);
  doc.addImage(HeroImg, 'jpg', 1, 1, 1, 1);
  doc.save('hero-normal-card.pdf');
}

export default generatePDF;

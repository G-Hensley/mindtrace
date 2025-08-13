import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import type { Log } from '@/types/log';
import type { BehaviorCategory } from '@/types/behaviorCategory';
import { emojis } from '@/components/ui/inputs/EmojiSelector';

export const generatePDF = (studentName: string, logs: Log[], behaviorCategories: BehaviorCategory[]) => {

  // Create a new PDF document
  const doc = new jsPDF();

  // Set the font size to 16
  doc.setFontSize(16);

  // Set the font to Arial  
  doc.setFont('arial');

  // Add the student name to the PDF
  doc.text(`Behavior Report for ${studentName}`, 105, 20, { align: 'center' });

  // Add the logs to the PDF
  autoTable(doc, {
    startY: 30,
    head: [['No.', 'Date', 'Behavior', 'Mood', 'Notes']],
    body: logs.map((log, index) => [
      index + 1, 
      log.created_at?.split('T')[0] || 'Unknown', 
      behaviorCategories.find((category) => category.id === log.behavior_category_id)?.name || 'Unknown', 
      emojis.find((mood) => mood.emoji === log.mood)?.name || 'Unknown', 
      log.notes || 'No notes'
    ]),
    styles: {
      fontSize: 12,
    },
    headStyles: { fillColor: '#2ca7a3' },
  })
  
  // Save the PDF
  doc.save(`${studentName}_behavior_report.pdf`);
}
import React from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function PdfPayment() {
    const generatePDF = () => {
        const doc = new jsPDF();
        doc.addFont('hoa-don-thanh-toan-phong.pdf', 'CustomFont', 'normal');
        doc.setFont('CustomFont');
        doc.text('Hoá Đơn Thanh Toán Phòng', 10, 10);
        const invoiceData = [
            ['Phòng', 'Giá', 'Số lượng', 'Tổng', 'Mã phòng', 'Mã pin'],
            ['Phòng Deluxe', '200', '2', '400', '10', '111'],
            ['Phòng Suite', '300', '1', '300','10', '111'],
            ['Phòng VIP', '500', '1', '500','10', '111'],
        ];
        doc.autoTable({
            startY: 20, 
            head: invoiceData.slice(0, 1),
            body: invoiceData.slice(1), 
        });
        const totalAmount = invoiceData.reduce((acc, row, index) => {
            if (index !== 0) {
                return acc + parseInt(row[3]);
            }
            return acc;
        }, 0);
        doc.text(`Tổng thanh toán: ${totalAmount} VND`, 10, doc.autoTable.previous.finalY + 10);
        doc.save('hoa-don-thanh-toan-phong.pdf');
    };

    return (
        <div>
            <button onClick={generatePDF}>Tạo Hoá Đơn Thanh Toán</button>
        </div>
    );
}

export default PdfPayment;

function calculateEMI() {
  const P = parseFloat(document.getElementById("amount").value);
  const annualRate = parseFloat(document.getElementById("rate").value);
  const years = parseFloat(document.getElementById("term").value);

  const r = annualRate / 12 / 100;
  const n = years * 12;

  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  // Create styled output
  document.getElementById("result").innerHTML = `
    <div class="result-card">
      <h3>📊 Loan EMI Summary</h3>
      <div class="result-row"><span class="label">Monthly EMI:</span> <span class="value emi">₹${emi.toFixed(2)}</span></div>
      <div class="result-row"><span class="label">Total Interest:</span> <span class="value interest">₹${totalInterest.toFixed(2)}</span></div>
      <div class="result-row"><span class="label">Total Payment:</span> <span class="value total">₹${totalPayment.toFixed(2)}</span></div>
    </div>
  `;

  
}
function copyResult() {
  const text = document.getElementById("result").innerText;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ EMI result copied to clipboard!");
  }).catch(err => {
    alert("❌ Failed to copy!");
  });
}

function downloadPDF() {
  const doc = new jsPDF();
  const content = document.getElementById("result").innerText;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Loan EMI Summary", 20, 20);

  doc.setFontSize(14);
  const lines = doc.splitTextToSize(content, 170);
  doc.text(lines, 20, 40);

  doc.save("EMI_Summary.pdf");
}

import PyPDF2
from docx import Document
import io
import re

class ResumeProcessor:
    def extract_text(self, content: bytes, filename: str) -> str:
        if filename.endswith('.pdf'):
            return self._extract_pdf_text(content)
        elif filename.endswith('.docx'):
            return self._extract_docx_text(content)
        
    def _extract_pdf_text(self, content: bytes) -> str:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return self._clean_text(text)
    
    def _extract_docx_text(self, content: bytes) -> str:
        doc = Document(io.BytesIO(content))
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return self._clean_text(text)
    
    def _clean_text(self, text: str) -> str:
        # Remove extra whitespace and normalize
        text = re.sub(r'\s+', ' ', text)
        text = re.sub(r'[^\w\s\.\,\-\+\#]', ' ', text)
        return text.strip()
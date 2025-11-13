import React, { useState } from "react";
import { khung } from "~/assets/khung";
import './Home.css';
import { Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';


const Home: React.FC = () => {
  // multi-select state: array of selected bit keys (lowercase)
  const [selected, setSelected] = useState<string[]>([]);
  const options = [
    'bone', 'clay', 'copper', 'essence', 'flower', 'ice', 'iron', 'leaf', 'magma', 'quartz', 'salt', 'stone', 'sugar', 'uranium', 'wax', 'wood', 'wool', 'zinc', 'oil'
  ];

  // filter: show frames that have at least 2 of the selected bits
  const filtered = khung.filter(item => {
    if (selected.length === 0) return true;
    if (selected.length === 1) return item.bit.map(b => b.toLowerCase()).includes(selected[0]);

    const lowerBits = item.bit.map(b => b.toLowerCase());
    // Đếm số bit được chọn mà frame này có
    const matchCount = selected.filter(sel => lowerBits.includes(sel)).length;

    // Frame phải có ít nhất 2 bit trong số các bit được chọn
    return matchCount >= 2;
  });

  function copyToClipboard(text: string) {
    const fullText = "k!buy " + text.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText).then(() => {
        toast.success('Đã sao chép vào clipboard!', { position: "top-right", autoClose: 2000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined });
      }).catch((err) => {
        console.error('Copy failed:', err);
        toast.error('Copy thất bại!', { position: "top-right", autoClose: 2000 });
      });
    } else {
      // Fallback cho trình duyệt cũ
      const textarea = document.createElement('textarea');
      textarea.value = fullText;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        toast.success('Đã sao chép vào clipboard!', { position: "top-right", autoClose: 2000 });
      } catch (err) {
        console.error('Fallback copy failed:', err);
        toast.error('Copy thất bại!', { position: "top-right", autoClose: 2000 });
      }
      document.body.removeChild(textarea);
    }
  }

  return <>
    <div className="header-table">
      <ToastContainer />
      <div className="filter-group">
        <div className="checkbox-group">
          {options.map(opt => (
              <Form.Check
                type="checkbox"
                label={opt.charAt(0).toUpperCase() + opt.slice(1)}
                checked={selected.includes(opt)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelected([...selected, opt]);
                  } else {
                    setSelected(selected.filter(s => s !== opt));
                  }
                }}
              />
          ))}
        </div>
        {selected.length > 0 && (
          <div className="filter-info">
            <button className="clear-btn" onClick={() => setSelected([])}>Xóa hết</button>
            <span className="hint">
              {selected.length > 1 ? '(Hiện khung có ít nhất 2 bit trong số đã chọn)' : ''}
            </span>
          </div>
        )}
      </div>
    </div>

    <div className="content">
      {filtered.map((item: { title: string; link: string; cmd?: string; bit: string[] }) => (
        <div key={item.title} className="frame">
          <img src={item.link} alt={item.title} />
          <br />
          <Form.Group className="mb-3">
            <Form.Label>{item.title}</Form.Label><br />
            <Button variant="primary" onClick={() => {
              copyToClipboard(item.cmd ? item.cmd : '');
            }}> Copy</Button>
          </Form.Group>
        </div>
      ))}
    </div>
  </>;
}

export default Home;
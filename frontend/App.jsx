import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";

const App = () => {
  const [emailBody, setEmailBody] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setAttachments([...e.target.files]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email_body", emailBody);
    attachments.forEach(file => formData.append("attachments", file));

    try {
      const response = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Email Classifier with OCR</h2>
        <Textarea
          className="mb-4"
          placeholder="Paste email body here..."
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
        />
        <Input type="file" multiple onChange={handleFileChange} className="mb-4" />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <Loader2 className="animate-spin mr-2" /> : <Upload className="mr-2" />}Submit
        </Button>
      </Card>

      {result && (
        <Card className="p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold mb-2">Classification Result</h3>
          <p><strong>Routing:</strong> {result.routing}</p>
          <p><strong>Confidence:</strong> {result.confidence}%</p>
          <p><strong>Probability:</strong> {result.probability}</p>
          <h4 className="text-md font-semibold mt-4">Extracted Information:</h4>
          <ul className="list-disc list-inside">
            {Object.entries(result.extracted_info).map(([key, val]) => (
              <li key={key}><strong>{key}:</strong> {val.join(", ")}</li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default App;
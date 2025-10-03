// import React, { useState, useRef, useEffect} from "react";
// import axios from "axios";
// import { Link } from "@mui/material";
// import "../Products/View.css";

// import jsPDF from "jspdf";
// import Barcode from "react-qr-code";
// import html2canvas from "html2canvas";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { transform_text } from "../utils";
// import Button from "@mui/material/Button";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import imagess from "../../Components/Logo/Mogo.png";
// import Webcam from "react-webcam";
// import manoImage from "../../Components/Logo/mano.jpg";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { REACT_APP_BACKEND_SERVER_URL } from "../../config";
// // import Tesseract from "tesseract.js";

// let isGeneratingPdf = false;

// const WeightFormPopup = ({
//   showPopup,
//   closePopup,
//   productId,
//   product,
//   productInfo,
//   updateProductList,
// }) => {
//   console.log(product, "1111111111111111");
//   console.log(productInfo, "detailssssssss");
//   const [capturedImages, setCapturedImages] = useState({
//     before_weight_img: null,
//     after_weight_img: null,
//     final_weight_img: null,

//   });
//   console.log("kkkkkkkkkk",capturedImages)

//     // const [digitalNumber, setDigitalNumber] = useState("");
//   const [beforeWeight, setBeforeWeight] = useState(productInfo.before_weight);
//   const [afterWeight, setAfterWeight] = useState(productInfo.after_weight);
//   const [barcodeWeight, setBarcodeWeight] = useState(
//     productInfo.barcode_weight
//   );
//     const [products, setProducts] = useState([]);
//   const [difference, setDifference] = useState(productInfo.difference);
//   const [adjustment, setAdjustment] = useState(productInfo.adjustment);
//   const [showBarcode, setShowBarcode] = useState(false);
//   const [selectedProductNo, setSelectedProductNo] = useState();
//   const [beforeWeightPreview, setBeforeWeightPreview] = useState(null);
//   const [afterWeightPreview, setAfterWeightPreview] = useState(null);
//   const [finalWeightPreview, setFinalWeightPreview] = useState(null);
//   const [product_number, setProductNumber] = useState(
//     transform_text(productInfo.product_number ? productInfo.product_number : "")
//   );
//   const [finalWeight, setFinalWeight] = useState(
//     productInfo.final_weight || ""
//   );

//   const [webcamVisible, setWebcamVisible] = useState(false);
//   const [currentField, setCurrentField] = useState(null);
 
//   const webcamRef = useRef(null);
//   const popupRef = useRef(null);
  

//   const barcodeRef = useRef(null);
  
//   const handleExportPdf = async () => {
//     if (barcodeRef.current) {
//       try {
//         const canvas = await html2canvas(barcodeRef.current, {
//           backgroundColor: null,
//         });
//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF({
//           orientation: "landscape",
//           unit: "mm",
//           format: [55, 12],
//         });
//         pdf.addImage(imgData, "PNG", 9, 3, 40, 7);
//         const pdfBlob = pdf.output("blob");
//         const pdfUrl = URL.createObjectURL(pdfBlob);

//         window.open(pdfUrl, "_blank");
//       } catch (error) {
//         console.error("Error exporting barcode as PDF:", error);
//       }
//     }
//   };

//   const handleBulkExportPdf = async (items) => {
//     if (isGeneratingPdf) return;
//     isGeneratingPdf = true;
   
//     try {
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "mm",
//         format: [56, 12],
//         compress: true,
//         dpi: 300,
//       });
   
//       const scale = 5;
   
//       for (let i = 0; i < items.length; i++) {
//         const item = items[i];
   
//         const tempDiv = document.createElement("div");
//         tempDiv.style.position = "absolute";
//         tempDiv.style.top = "-9999px";
//         tempDiv.style.left = "-9999px";
//         tempDiv.style.width = "55mm";
//         tempDiv.style.height = "12mm";
//         tempDiv.style.display = "flex";
//         tempDiv.style.flexDirection = "row";
//         tempDiv.style.backgroundColor = "#fff";
//         tempDiv.style.border = "1px solid #ccc";
//         tempDiv.style.boxSizing = "border-box";
//         tempDiv.style.padding = "2mm";
   
     
//         const leftSection = document.createElement("div");
//         leftSection.style.display = "flex";
//         leftSection.style.flexDirection = "row";
//         leftSection.style.alignItems = "center";
//         leftSection.style.width = "50%";
//         leftSection.style.marginLeft = "1rem";
   
//         const qrCodeContainer = document.createElement("div");
//         qrCodeContainer.style.display = "flex";
//         // qrCodeContainer.style.marginLeft = "1rem";
//         qrCodeContainer.style.fontWeight = "bold";
//         qrCodeContainer.style.fontSize = "9px";
//         qrCodeContainer.style.marginBottom = "2px";
//         qrCodeContainer.style.width = "2px";
   
//         const barcodeContainer = document.createElement("div");
//         qrCodeContainer.appendChild(barcodeContainer);
   
//         const barcodeSvg = (
//           <Barcode value={item.product_number} size={30} format="svg" />
//         );
//         const svgContainer = ReactDOMServer.renderToStaticMarkup(barcodeSvg);
//         barcodeContainer.innerHTML = svgContainer;
   
//         const detailsContainer = document.createElement("div");
//         detailsContainer.style.display = "flex";
//         detailsContainer.style.flexDirection = "column";
   
//         const barcodeWeightText = document.createElement("span");
//         barcodeWeightText.textContent = ` ${item.barcode_weight}`;
//         barcodeWeightText.style.fontSize = "9px";
//         barcodeWeightText.style.fontWeight = "bold";
//         barcodeWeightText.style.marginLeft = "7px";
//         detailsContainer.appendChild(barcodeWeightText);
   
//         const productNumberText = document.createElement("span");
//         productNumberText.textContent = ` ${transform_text(item.product_number)}`;
//         productNumberText.style.fontSize = "9px";
//         productNumberText.style.marginLeft = "4px";
//         productNumberText.style.fontWeight = "bold";
//         productNumberText.style.color = "black";
//         detailsContainer.appendChild(productNumberText);
   
//         qrCodeContainer.appendChild(detailsContainer);
//         leftSection.appendChild(qrCodeContainer);
//         tempDiv.appendChild(leftSection);
   
//         const rightSection = document.createElement("div");
//         rightSection.style.display = "flex";
//         rightSection.style.alignItems = "center";
//         rightSection.style.justifyContent = "center";
//         rightSection.style.width = "50%";
//         rightSection.style.marginLeft = "1rem";
   
//         const logoImg = document.createElement("img");
//         logoImg.src = manoImage;
//         logoImg.alt = "Logo";
//         logoImg.style.width = "13mm";
//         logoImg.style.height = "13mm";
//         logoImg.style.filter = "contrast(170%) brightness(100%)";
//         logoImg.style.boxShadow = "0px 0px 5px 2px black";
//         logoImg.style.fontWeight = "bold";
//         logoImg.style.marginBottom = "7px";
//         logoImg.style.marginLeft = "4.5mm";
//         logoImg.style.marginBottom="4px";
//         rightSection.appendChild(logoImg);
//         tempDiv.appendChild(rightSection);
   
//         document.body.appendChild(tempDiv);
   
       
//         const canvas = await html2canvas(tempDiv, {
//           backgroundColor: null,
//           scale: scale,
//         });
   
     
//         const rotatedCanvas = document.createElement("canvas");
//         rotatedCanvas.width = canvas.width;
//         rotatedCanvas.height = canvas.height;
//         const ctx = rotatedCanvas.getContext("2d");
//         ctx.translate(canvas.width / 2, canvas.height / 2);
//         ctx.rotate(Math.PI);
//         ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
   
//         const imgData = rotatedCanvas.toDataURL("image/png");
   
     
//         pdf.addImage(imgData, "PNG", 0, 0, 56, 12);
   
//         document.body.removeChild(tempDiv);
   
//         if (i < items.length - 1) {
//           pdf.addPage();
//         }
//       }
   
//       const pdfBlob = pdf.output("blob");
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       window.open(pdfUrl, "_blank");
//     } catch (error) {
//       console.error("Error exporting barcodes as PDF:", error);
//     } finally {
//       isGeneratingPdf = false;
//     }
//   };

// const handleExportdetailsPdf = async () => {
//   if (popupRef.current) {
//     try {
//       const logoWidth = 20;
//       const logoHeight = 20;
//       console.log("Capturing content...");
//       const elementsToHide = document.querySelectorAll(".exclude-from-pdf");
//       elementsToHide.forEach((el) => (el.style.display = "none"));

//       const productDetails = [
//         ["Product Number", product_number],
//         ["Before Weight", beforeWeight],
//         ["After Weight", afterWeight],
//         ["Difference", difference],
//         ["Adjustment", adjustment],
//         ["Enamel Weight", finalWeight],
//         ["Final Weight", barcodeWeight],
//       ];

//       const pdf = new jsPDF("p", "mm", "a4");
//       const pageHeight = pdf.internal.pageSize.getHeight();
//       const pageWidth = pdf.internal.pageSize.getWidth();
//       const margin = 10;
//       let currentY = margin;

//       pdf.setFontSize(16);
//       pdf.text("Product Details", pageWidth / 2, currentY, { align: "center" });
//       currentY += 10;

//       const logoX = pageWidth - margin - logoWidth;
//       pdf.addImage(
//         manoImage,
//         "JPEG",
//         logoX,
//         margin - 10,
//         logoWidth,
//         logoHeight
//       );

//       elementsToHide.forEach((el) => (el.style.display = ""));

//       pdf.autoTable({
//         startY: currentY,
//         margin: { left: margin, right: margin },
//         body: productDetails.map(([key, value]) => [key, value]),
//         theme: "grid",
//         head: [["Field", "Value"]],
//         styles: {
//           fontSize: 10,
//           cellPadding: 1,
//         },
//         headStyles: {
//           fillColor: "#25274D",
//           textColor: "#ffffff",
//         },
//       });

//       currentY = pdf.autoTable.previous.finalY + 10;

//       const imageWidth = 60;
//       const imageHeight = 100;

//       const totalHeightRequired = currentY + imageHeight;
//       if (totalHeightRequired > pageHeight) {
//         console.log(
//           "Not enough space on the current page, reducing image size..."
//         );
//         imageWidth = 50; 
//         imageHeight = 85; 
//       }


//       const imageStartX = (pageWidth - 2 * imageWidth) / 2; 

//       pdf.text("Before Weight Image", imageStartX, currentY);
//       pdf.addImage(
//         capturedImages.before_weight_img,
//         "JPEG",
//         imageStartX,
//         currentY + 5,
//         imageWidth,
//         imageHeight
//       );

//       pdf.text("After Weight Image", imageStartX + imageWidth, currentY);
//       pdf.addImage(
//         capturedImages.after_weight_img,
//         "JPEG",
//         imageStartX + imageWidth,
//         currentY + 5,
//         imageWidth,
//         imageHeight
//       );

//       currentY += imageHeight + 10;

//       pdf.text("Final Weight Image", pageWidth / 2, currentY, {
//         align: "center",
//       });
//       pdf.addImage(
//         capturedImages.final_weight_img,
//         "JPEG",
//         (pageWidth - imageWidth) / 2,
//         currentY + 5,
//         imageWidth,
//         imageHeight
//       );

//       console.log("Saving PDF...");
//       pdf.save("product_details.pdf");

//       elementsToHide.forEach((el) => (el.style.display = ""));
//     } catch (error) {
//       console.error("Error exporting popup as PDF:", error);
//     }
//   }
// };

//   const handleGenerateBarcode = (productNo) => {
//     if (!productNo) {
//       console.error("Product number is undefined or invalid!");
//       return;
//     }
//     setSelectedProductNo(productNo);
//     setShowBarcode(true);
//   };


// const handleSave = async () => {
//   try {
//     const updatedData = {
//       before_weight: parseFloat(beforeWeight),
//       after_weight: parseFloat(afterWeight),
//       barcode_weight: barcodeWeight,
//       product_number: product_number,
//       difference: parseFloat(difference),
//       adjustment: parseFloat(adjustment),
//       final_weight: parseFloat(finalWeight),
//     };

//     console.log("Data to send:", updatedData);

//     await axios.put(
//       `${REACT_APP_BACKEND_SERVER_URL}/api/v1/products/update/${productId}`,
//       updatedData
//     );

//     console.log("Updated Product Data:", updatedData);

//     const updatedProduct = {
//       ...product,
//       ...updatedData,
//     };

//     toast.success("Product saved successfully!");
//     window.location.reload();
//     updateProductList(updatedProduct);
//     closePopup();
//     window.location.reload();
//   } catch (error) {
//     console.error("Error updating product:", error);
//   }
// };

//   useEffect(() => {
//     const handleBarcodeScan = (e) => {
//       setShowBarcode((prevData) => prevData + e.key);

//       if (e.key === "Enter") {
//         console.log("Scanned Barcode:", showBarcode);
//         setShowBarcode("");
//       }
//     };

//     window.addEventListener("keydown", handleBarcodeScan);

//     return () => {
//       window.removeEventListener("keydown", handleBarcodeScan);
//     };
//   }, [showBarcode]);

//   useEffect(() => {
//     console.log("Product Object: ", product);
//     if (product && product.product_number) {
//       console.log("Product Number: ", product.product_number);
//     }
//   }, [product]);

//   useEffect(() => {
//     setBeforeWeight(productInfo.before_weight);
//     setAfterWeight(productInfo.after_weight);
//     setBarcodeWeight(productInfo.barcode_weight);
//     setDifference(productInfo.difference);
//     setAdjustment(productInfo.adjustment);
//     setFinalWeight(productInfo.final_weight);
//     setProductNumber(transform_text(productInfo.product_number));
//   }, [productInfo]);

 

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get(
//           `${REACT_APP_BACKEND_SERVER_URL}/api/images?productId=${productId}`
//         );

//         const { before_weight_img, after_weight_img, final_weight_img } =
//           response.data || {};
//         console.log("API Response:", response.data);
//         setCapturedImages({
//           before_weight_img: before_weight_img || null,
//           after_weight_img: after_weight_img || null,
//           final_weight_img: final_weight_img || null,
//         });
//         console.log("beforeeeeeeeeeeee",before_weight_img)
      
//       } catch (error) {
//         console.error("Error fetching images:", error);
        
//       }
//     };

//     fetchImages();
//   }, [productId]);

//   const uploadImage = async (image, fieldName) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("fieldName", fieldName);
//       formData.append("productId", productId);
//       console.log("FormData contains image:", formData.get("image"));
//       const response = await axios.post(
//         `${REACT_APP_BACKEND_SERVER_URL}/api/images/upload`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
      

//       console.log("Backend response:", response.data);

//       const uploadedImage = response.data.productImage;
//       console.log("Uploaded image data:", uploadedImage);

//       if (uploadedImage && uploadedImage[fieldName]) {

//         const imageUrl = `${REACT_APP_BACKEND_SERVER_URL}/uploads/${uploadedImage[fieldName]}`;

//         console.log(`Image URL: ${imageUrl}`);
//         setCapturedImages((prev) => ({
//           ...prev,
//           [fieldName]: imageUrl,
//         }));
//       } else {
//         console.error("Image URL is not found for the given field.");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   const toggleWebcam = (field) => {
//     setWebcamVisible((prev) => !prev);
//     setCurrentField(field);
//   };

//   const base64ToFile = (base64Data, filename, mimeType) => {
//     const byteCharacters = atob(base64Data.split(",")[1]);
//     const byteArrays = [];

//     for (let offset = 0; offset < byteCharacters.length; offset++) {
//       const byte = byteCharacters.charCodeAt(offset);
//       byteArrays.push(byte);
//     }

//     const byteArray = new Uint8Array(byteArrays);
//     return new File([byteArray], filename, { type: mimeType });
//   };

 
// const captureImage = () => {
//   if (webcamRef.current) {
//     const video = webcamRef.current.video;
//     const canvas = document.createElement("canvas");

//     canvas.width = video.videoWidth; 
//     canvas.height = video.videoHeight;

//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

//     const image = canvas.toDataURL("image/jpeg", 1.0); 
//     const file = base64ToFile(image, "captured-image.jpg", "image/jpeg");

//     uploadImage(file, currentField);
//       // extractDigitalNumber(image);
//   }
// };
//   // const extractDigitalNumber = (image) => {
//   //   Tesseract.recognize(image, "eng", {
//   //     logger: (info) => console.log(info),
//   //     tessedit_char_whitelist: "0123456789.", // Only allow digits and the decimal point
//   //     psm: 6, // Treat the image as a block of text
//   //     oem: 3, // Use both LSTM and traditional Tesseract models
//   //   })
//   //     .then(({ data: { text } }) => {
//   //       console.log("OCR Output:", text); // Debugging the raw OCR text

//   //       // Correct common OCR misinterpretations and clean the text
//   //       const correctedText = text
//   //         .replace(/O/g, "0") // Replace 'O' with '0'
//   //         .replace(/l/g, "1") // Replace 'l' with '1'
//   //         .replace(/I/g, "1") // Replace 'I' with '1'
//   //         .replace(/[^0-9.]/g, ""); // Remove non-numeric characters, keeping only numbers and decimal points

//   //       console.log("Corrected OCR Output:", correctedText); // Log the corrected text

//   //       // Match and extract numbers with or without decimals
//   //       const extractedNumber = correctedText.match(/(\d+\.\d+|\d+)/);
//   //       if (extractedNumber) {
//   //         console.log("Extracted Number:", extractedNumber[0]);
//   //         setDigitalNumber(extractedNumber[0]); // Set the state with the extracted number
//   //       } else {
//   //         console.warn("No valid number detected in OCR output.");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error during OCR processing:", error);
//   //     });
//   // };



 
//   return (
//     showPopup && (
//       <div className="popup-2">
//         <div className="popup-contentt" ref={popupRef}>
//           <div className="clos">
//             <div onClick={closePopup} className="close-button">
//               <FontAwesomeIcon style={{ marginLeft: "28rem" }} icon={faXmark} />
//             </div>
//           </div>
//           <form className="in-position">
//             <div>
//               <label>Product Number:</label>
//               <input
//                 style={{ width: "30rem" }}
//                 type="text"
//                 value={product_number}
//                 onChange={(e) => setProductNumber(e.target.value)}
//                 placeholder="Enter Product Number"
//               />
//             </div>

//             <div>
//               <label>Before Weight:</label>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   style={{ width: "30rem" }}
//                   type="number"
//                   value={beforeWeight}
//                   onChange={(e) => setBeforeWeight(e.target.value)}
//                   // id="digitalNumber"
//                   // value={digitalNumber}
//                   // onChange={(e) => setDigitalNumber(e.target.value)}
//                   placeholder="Enter Before Weight"
//                 />

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginLeft: "8px",
//                   }}
//                 >
//                   {capturedImages.before_weight_img && (
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+capturedImages.before_weight_img}
//                       alt="Captured"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                   )}

//                   <CameraAltIcon
//                     className="exclude-from-pdf"
//                     onClick={() => toggleWebcam("before_weight_img")}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <Link
//                     className="exclude-from-pdf"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       if (capturedImages.before_weight_img) {
//                         setBeforeWeightPreview(
//                           capturedImages.before_weight_img
//                         );
//                       }
//                     }}
//                     size="small"
//                     variant="outlined"
//                   >
//                     Preview
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 {beforeWeightPreview && (
//                   <div
//                     style={{
//                       marginTop: "20px",
//                       padding: "10px",
//                       border: "1px solid #ccc",
//                       borderRadius: "8px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h3> Before Weight Preview Image</h3>
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+beforeWeightPreview}
//                       alt="Preview"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                     <br />
//                     <Button
//                       onClick={() => setBeforeWeightPreview(null)}
//                       size="small"
//                       variant="outlined"
//                       style={{ marginTop: "10px" }}
//                     >
//                       Close Preview
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label>After Weight:</label>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   style={{ width: "30rem" }}
//                   type="number"
//                   value={afterWeight}
//                   onChange={(e) => setAfterWeight(e.target.value)}
//                   placeholder="Enter After Weight"
//                 />

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginLeft: "8px",
//                   }}
//                 >
//                   {capturedImages.after_weight_img && (
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+capturedImages.after_weight_img}
//                       alt="Captured"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                   )}

//                   <CameraAltIcon
//                     className="exclude-from-pdf"
//                     onClick={() => toggleWebcam("after_weight_img")}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <Link
//                     className="exclude-from-pdf"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       if (capturedImages.after_weight_img) {
//                         setAfterWeightPreview(capturedImages.after_weight_img);
//                       }
//                     }}
//                     size="small"
//                     variant="outlined"
//                   >
//                     Preview
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 {afterWeightPreview && (
//                   <div
//                     style={{
//                       marginTop: "20px",
//                       padding: "10px",
//                       border: "1px solid #ccc",
//                       borderRadius: "8px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h3>After Weight Preview Image</h3>
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+afterWeightPreview}
//                       alt="Preview"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                     <br />
//                     <Button
//                       onClick={() => setAfterWeightPreview(null)}
//                       size="small"
//                       variant="outlined"
//                       style={{ marginTop: "10px" }}
//                     >
//                       Close Preview
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div>
//               <label>Difference:</label>
//               <input
//                 style={{ width: "30rem" }}
//                 type="number"
//                 value={difference}
//                 onChange={(e) => setDifference(e.target.value)}
//                 placeholder="Enter Difference Weight"
//               />
//             </div>
//             <div>
//               <label>Adjustment:</label>
//               <input
//                 style={{ width: "30rem" }}
//                 type="number"
//                 value={adjustment}
//                 onChange={(e) => setAdjustment(e.target.value)}
//                 placeholder="Enter Adjustment Weight"
//               />
//             </div>
//             <div>
//               <label>Enamel Weight:</label>
//               <input
//                 style={{ width: "30rem" }}
//                 type="number"
//                 value={finalWeight}
//                 onChange={(e) => setFinalWeight(e.target.value)}
//                 placeholder="Enter Enamel Weight"
//               />
//             </div>
//             <div>
//               <label>Final Weight:</label>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <input
//                   style={{ width: "30rem" }}
//                   type="number"
//                   value={barcodeWeight}
//                   onChange={(e) => setBarcodeWeight(e.target.value)}
//                   placeholder="Enter Final Weight"
//                 />

//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     marginLeft: "8px",
//                   }}
//                 >
//                   {capturedImages.final_weight_img && (
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+capturedImages.final_weight_img}
//                       alt="Captured"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                   )}

//                   <CameraAltIcon
//                     className="exclude-from-pdf"
//                     onClick={() => toggleWebcam("final_weight_img")}
//                     style={{ cursor: "pointer" }}
//                   />
//                   <Link
//                     className="exclude-from-pdf"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       if (capturedImages.final_weight_img) {
//                         setFinalWeightPreview(capturedImages.final_weight_img);
//                       }
//                     }}
//                     size="small"
//                     variant="outlined"
//                   >
//                     Preview
//                   </Link>
//                 </div>
//               </div>
//               <div>
//                 {finalWeightPreview && (
//                   <div
//                     style={{
//                       marginTop: "20px",
//                       padding: "10px",
//                       border: "1px solid #ccc",
//                       borderRadius: "8px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h3>Final Weight Preview Image</h3>
//                     <img
//                       src={REACT_APP_BACKEND_SERVER_URL+finalWeightPreview}
//                       alt="Preview"
//                       style={{
//                         maxWidth: "300px",
//                         maxHeight: "300px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                       }}
//                     />
//                     <br />
//                     <Button
//                       onClick={() => setFinalWeightPreview(null)}
//                       size="small"
//                       variant="outlined"
//                       style={{ marginTop: "10px" }}
//                     >
//                       Close Preview
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </form>

//           <br></br>
//           {webcamVisible && (
//             <div
//               className="centered-webcam"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 margin: "10px 0",
//               }}
//             >
//               <Webcam
//                 ref={webcamRef}
//                 style={{
//                   width: "200px",
//                   height: "300px",
//                   // border: "2px solid #ccc",
//                 }}
//                 screenshotFormat="image/jpeg"
//                 screenshotQuality={1}
//               />
//               <Button
//                 onClick={() => captureImage("image")}
//                 variant="contained"
//                 size="small"
//                 style={{
//                   marginTop: "10px",
//                   backgroundColor: "#25274D",
//                   color: "white",
//                 }}
//               >
//                 Capture
//               </Button>
//             </div>
//           )}

//           <div
//             className="button-group"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               gap: "10px",
//             }}
//           >
//             <Button
//               className="exclude-from-pdf"
//               onClick={handleSave}
//               variant="contained"
//               size="small"
//               style={{
//                 backgroundColor: "#25274D",
//                 color: "white",
//                 width: "20%",
//               }}
//             >
//               Save
//             </Button>

//             <div style={{ display: "flex", gap: "10px" }}>
//               <Button
//                 className="exclude-from-pdf"
//                 onClick={() => handleGenerateBarcode(product.product_number)}
//                 variant="contained"
//                 size="small"
//                 style={{ backgroundColor: "#25274D", color: "white" }}
//               >
//                 Generate QR
//               </Button>
//               {/* <Button
//                 className="exclude-from-pdf"
//                 onClick={handleExportPdf}
//                 variant="contained"
//                 size="small"
//                 style={{ backgroundColor: "#25274D", color: "white" }}
//               >
//                 Export as PDF
//               </Button> */}
//                <button
//           onClick={() => handleBulkExportPdf(products)}
//           style={{
//             marginTop: "1rem",
//             marginLeft: "4rem",
//             height: "2rem",
//             width: "8rem",
//             fontWeight: "bold",
//             fontSize: "1rem",
//             borderRadius: "5px",
//             backgroundColor: "rgb(36, 36, 66)",
//             color: "white",
//           }}
//         >
//           Print 
//         </button>
//               <Button
//                 className="exclude-from-pdf"
//                 onClick={handleExportdetailsPdf}
//                 variant="contained"
//                 size="small"
//                 style={{ backgroundColor: "#25274D", color: "white" }}
//               >
//                 Export Details as PDF
//               </Button>
//             </div>
//           </div>
//           {showBarcode && selectedProductNo && (
//             <div
//               ref={barcodeRef}
//               style={{
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 marginLeft: "5rem",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   marginLeft: "35px",
//                 }}
//               >
//                 <Barcode value={selectedProductNo || ""} size={90} />
//               </div>
//               <div style={{ display: "flex", gap: "4rem" }}>
//                 <div
//                   style={{
//                     fontSize: "20px",
//                     marginLeft: "0.3rem",
//                     fontWeight: "bold",
//                     marginBottom: "1rem",
//                   }}
//                 >
//                   <div>{product.barcode_weight}</div>
//                   <div>{transform_text(product.product_number)}</div>
//                 </div>
//                 <div>
//                   {" "}
//                   <img
//                     src={imagess}
//                     alt="jewelery"
//                     style={{ height: "80px", width: "80px" }}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   );
// };

// export default WeightFormPopup;


import React, { useState, useRef, useEffect} from "react";
import axios from "axios";
import { Link } from "@mui/material";
import "../Products/View.css";
import jsPDF from "jspdf";
import Barcode from "react-qr-code";
import html2canvas from "html2canvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { transform_text } from "../utils";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import imagess from "../../Components/Logo/Mogo.png";
import Webcam from "react-webcam";
import manoImage from "../../Components/Logo/mano.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REACT_APP_BACKEND_SERVER_URL } from "../../config";
import ReactDOMServer from "react-dom/server";
import { handleWeight } from "../utils";
let isGeneratingPdf = false;

const WeightFormPopup = ({
  showPopup,
  closePopup,
  productId,
  product,
  productInfo,
  updateProductList,
}) => {
  console.log(product, "1111111111111111");
  console.log(productInfo, "detailssssssss");
  const [capturedImages, setCapturedImages] = useState({
    before_weight_img: null,
    after_weight_img: null,
    final_weight_img: null,

  });
  console.log("kkkkkkkkkk",capturedImages)

  
  const [beforeWeight, setBeforeWeight] = useState(productInfo.before_weight);
  const [afterWeight, setAfterWeight] = useState(productInfo.after_weight);
  const [barcodeWeight, setBarcodeWeight] = useState(
    productInfo.barcode_weight
  );
  const [difference, setDifference] = useState(productInfo.difference);
  const [adjustment, setAdjustment] = useState(productInfo.adjustment);
  const [products, setProducts] = useState([]);
  const [showBarcode, setShowBarcode] = useState(false);
  const [selectedProductNo, setSelectedProductNo] = useState();
  const [beforeWeightPreview, setBeforeWeightPreview] = useState(null);
  const [afterWeightPreview, setAfterWeightPreview] = useState(null);
  const [finalWeightPreview, setFinalWeightPreview] = useState(null);
  const [product_number, setProductNumber] = useState(
    transform_text(productInfo.product_number ? productInfo.product_number : "")
  );
  const [finalWeight, setFinalWeight] = useState(
    productInfo.final_weight || ""
  );

  const [webcamVisible, setWebcamVisible] = useState(false);
  const [currentField, setCurrentField] = useState(null);
 
  const webcamRef = useRef(null);
  const popupRef = useRef(null);
  

  const barcodeRef = useRef(null);
   const tableData = products.map((product, index) => [
        index + 1,
        transform_text(product.product_number),
        product.before_weight,
        product.after_weight,
        product.difference,
        product.adjustment,
        product.final_weight,
        product.barcode_weight,
      ]);

  const handleExportPdf = async () => {
    if (barcodeRef.current) {
      try {
        const canvas = await html2canvas(barcodeRef.current, {
          backgroundColor: null,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: [55, 12],
        });
        pdf.addImage(imgData, "PNG", 9, 3, 40, 7);
        const pdfBlob = pdf.output("blob");
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, "_blank");
      } catch (error) {
        console.error("Error exporting barcode as PDF:", error);
      }
    }
  };

const handleBulkExportPdf = async (items) => {

  console.log("ietetteee", items);
  if (isGeneratingPdf) return;
  isGeneratingPdf = true;

  try {
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [56, 12],
      compress: true,
      dpi: 300,
    });

    const scale = 5;

     const tempDiv = document.createElement("div");
     tempDiv.style.position = "absolute";
     tempDiv.style.top = "-9999px";
     tempDiv.style.left = "-9999px";
     tempDiv.style.width = "55mm";
     tempDiv.style.height = "12mm";
     tempDiv.style.display = "flex";
     tempDiv.style.flexDirection = "row";
     tempDiv.style.backgroundColor = "#fff";
     tempDiv.style.border = "1px solid #ccc";
     tempDiv.style.boxSizing = "border-box";
     tempDiv.style.padding = "2mm";

     const leftSection = document.createElement("div");
     leftSection.style.display = "flex";
     leftSection.style.flexDirection = "row";
     leftSection.style.alignItems = "center";
     leftSection.style.width = "50%";
     leftSection.style.marginLeft = "1rem";

     const qrCodeContainer = document.createElement("div");
     qrCodeContainer.style.display = "flex";
    //  qrCodeContainer.style.marginLeft = "1rem";
     qrCodeContainer.style.fontWeight = "bold";
     qrCodeContainer.style.fontSize = "9px";
     qrCodeContainer.style.marginBottom = "2px";
     qrCodeContainer.style.width = "2px";

     const barcodeContainer = document.createElement("div");
     qrCodeContainer.appendChild(barcodeContainer);

     const barcodeSvg = (
       <Barcode value={items.product_number} size={30} format="svg" />
     );
     const svgContainer = ReactDOMServer.renderToStaticMarkup(barcodeSvg);
     barcodeContainer.innerHTML = svgContainer;

     const detailsContainer = document.createElement("div");
     detailsContainer.style.display = "flex";
     detailsContainer.style.flexDirection = "column";

     const barcodeWeightText = document.createElement("span");
     barcodeWeightText.textContent = ` ${items.barcode_weight}`;
     barcodeWeightText.style.fontSize = "9px";
     barcodeWeightText.style.fontWeight = "bold";
     barcodeWeightText.style.marginLeft = "7px";
     detailsContainer.appendChild(barcodeWeightText);

     const productNumberText = document.createElement("span");
     productNumberText.textContent = ` ${transform_text(items.product_number)}`;
     productNumberText.style.fontSize = "9px";
     productNumberText.style.marginLeft = "4px";
     productNumberText.style.fontWeight = "bold";
     productNumberText.style.color = "black";
     detailsContainer.appendChild(productNumberText);

     qrCodeContainer.appendChild(detailsContainer);
     leftSection.appendChild(qrCodeContainer);
     tempDiv.appendChild(leftSection);

     const rightSection = document.createElement("div");
     rightSection.style.display = "flex";
     rightSection.style.alignItems = "center";
     rightSection.style.justifyContent = "center";
     rightSection.style.width = "50%";
     rightSection.style.marginLeft = "1rem";

     const logoImg = document.createElement("img");
     logoImg.src = manoImage;
     logoImg.alt = "Logo";
     logoImg.style.width = "13mm";
     logoImg.style.height = "13mm";
     logoImg.style.filter = "contrast(170%) brightness(100%)";
     logoImg.style.boxShadow = "0px 0px 5px 2px black";
     logoImg.style.fontWeight = "bold";
     logoImg.style.marginBottom = "7px";
     logoImg.style.marginLeft = "4.5mm";
     logoImg.style.marginBottom = "4px";
     rightSection.appendChild(logoImg);
     tempDiv.appendChild(rightSection);

     document.body.appendChild(tempDiv);

     const canvas = await html2canvas(tempDiv, {
       backgroundColor: null,
       scale: scale,
     });

     const rotatedCanvas = document.createElement("canvas");
     rotatedCanvas.width = canvas.width;
     rotatedCanvas.height = canvas.height;
     const ctx = rotatedCanvas.getContext("2d");
     ctx.translate(canvas.width / 2, canvas.height / 2);
     ctx.rotate(Math.PI);
     ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

     const imgData = rotatedCanvas.toDataURL("image/png");

     pdf.addImage(imgData, "PNG", 0, 0, 56, 12);

     document.body.removeChild(tempDiv);

    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("Error exporting barcodes as PDF:", error);
  } finally {
    isGeneratingPdf = false;
  }
  
};


const handleExportdetailsPdf = async () => {
  console.log('captured images',capturedImages)
  if (popupRef.current) {
    try {
      const logoWidth = 20;
      const logoHeight = 20;
      console.log("Capturing content...");
      const elementsToHide = document.querySelectorAll(".exclude-from-pdf");
      elementsToHide.forEach((el) => (el.style.display = "none"));

      const productDetails = [
        ["Product Number", product_number],
        ["Before Weight", beforeWeight],
        ["After Weight", afterWeight],
        ["Difference", difference],
        ["Adjustment", adjustment],
        ["Enamel Weight", finalWeight],
        ["Final Weight", barcodeWeight],
      ];

      const pdf = new jsPDF("p", "mm", "a4");
      const pageHeight = pdf.internal.pageSize.getHeight();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 10;
      let currentY = margin;

      pdf.setFontSize(16);
      pdf.text("Product Details", pageWidth / 2, currentY, { align: "center" });
      currentY += 10;

      const logoX = pageWidth - margin - logoWidth;
      pdf.addImage(
        manoImage,
        "JPEG",
        logoX,
        margin - 10,
        logoWidth,
        logoHeight
      );

      elementsToHide.forEach((el) => (el.style.display = ""));

      pdf.autoTable({
        startY: currentY,
        margin: { left: margin, right: margin },
        body: productDetails.map(([key, value]) => [key, value]),
        theme: "grid",
        head: [["Field", "Value"]],
        styles: {
          fontSize: 10,
          cellPadding: 1,
        },
        headStyles: {
          fillColor: "#25274D",
          textColor: "#ffffff",
        },
      });

      currentY = pdf.autoTable.previous.finalY + 10;

      const imageWidth = 60;
      const imageHeight = 100;

      const totalHeightRequired = currentY + imageHeight;
      if (totalHeightRequired > pageHeight) {
        console.log(
          "Not enough space on the current page, reducing image size..."
        );
        imageWidth = 50; 
        imageHeight = 85; 
      }


      const imageStartX = (pageWidth - 2 * imageWidth) / 2; 

      pdf.text("Before Weight Image", imageStartX, currentY);
      pdf.addImage(
        capturedImages.before_weight_img,
        "JPEG",
        imageStartX,
        currentY + 5,
        imageWidth,
        imageHeight
      );

      pdf.text("After Weight Image", imageStartX + imageWidth, currentY);
      pdf.addImage(
        capturedImages.after_weight_img,
        "JPEG",
        imageStartX + imageWidth,
        currentY + 5,
        imageWidth,
        imageHeight
      );

      currentY += imageHeight + 10;

      pdf.text("Final Weight Image", pageWidth / 2, currentY, {
        align: "center",
      });
      pdf.addImage(
        capturedImages.final_weight_img,
        "JPEG",
        (pageWidth - imageWidth) / 2,
        currentY + 5,
        imageWidth,
        imageHeight
      );

      console.log("Saving PDF...");
      pdf.save("product_details.pdf");

      elementsToHide.forEach((el) => (el.style.display = ""));
    } catch (error) {
      console.error("Error exporting popup as PDF:", error);
    }
  }
};

  const handleGenerateBarcode = (productNo) => {
    if (!productNo) {
      console.error("Product number is undefined or invalid!");
      return;
    }
    setSelectedProductNo(productNo);
    setShowBarcode(true);
  };


const handleSave = async () => {
  try {
    const updatedData = {
      before_weight: parseFloat(beforeWeight),
      after_weight: parseFloat(afterWeight),
      barcode_weight: barcodeWeight,
      product_number: product_number,
      difference: parseFloat(difference),
      adjustment: parseFloat(adjustment),
      final_weight: parseFloat(finalWeight),
    };

    console.log("Data to send:", updatedData);

    await axios.put(
      `${REACT_APP_BACKEND_SERVER_URL}/api/v1/products/update/${productId}`,
      updatedData
    );

    console.log("Updated Product Data:", updatedData);

    const updatedProduct = {
      ...product,
      ...updatedData,
    };

    toast.success("Product saved successfully!");
    window.location.reload();
    updateProductList(updatedProduct);


  } catch (error) {
    console.error("Error updating product:", error);
  }
};

  useEffect(() => {
    const handleBarcodeScan = (e) => {
      setShowBarcode((prevData) => prevData + e.key);

      if (e.key === "Enter") {
        console.log("Scanned Barcode:", showBarcode);
        setShowBarcode("");
      }
    };

    window.addEventListener("keydown", handleBarcodeScan);

    return () => {
      window.removeEventListener("keydown", handleBarcodeScan);
    };
  }, [showBarcode]);

  useEffect(() => {
    console.log("Product Object: ", product);
    if (product && product.product_number) {
      console.log("Product Number: ", product.product_number);
    }
  }, [product]);

 

 

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `${REACT_APP_BACKEND_SERVER_URL}/api/images?productId=${productId}`
        );

        const { before_weight_img, after_weight_img, final_weight_img } =
          response.data || {};
        console.log("API Response:", response.data);
        setCapturedImages({
          before_weight_img: before_weight_img || null,
          after_weight_img: after_weight_img || null,
          final_weight_img: final_weight_img || null,
        });
        console.log("beforeeeeeeeeeeee",before_weight_img)
      
      } catch (error) {
        console.error("Error fetching images:", error);
        
      }
    };

    fetchImages();
  }, [productId]);

  const uploadImage = async (image, fieldName) => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("fieldName", fieldName);
      formData.append("productId", productId);
      console.log("FormData contains image:", formData.get("image"));
      const response = await axios.post(
        `${REACT_APP_BACKEND_SERVER_URL}/api/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      console.log("Backend response:", response.data);

      const uploadedImage = response.data.productImage;
      console.log("Uploaded image data:", uploadedImage);

      if (uploadedImage && uploadedImage[fieldName]) {

        const imageUrl = `${REACT_APP_BACKEND_SERVER_URL}/uploads/${uploadedImage[fieldName]}`;

        console.log(`Image URL: ${imageUrl}`);
        setCapturedImages((prev) => ({
          ...prev,
          [fieldName]: imageUrl,
        }));

        try {
          const weight = await handleWeight();  // Await the function call and Weight Api
          console.log(weight.weightdata);
  
          switch (fieldName) {
              case "before_weight_img":
                  setBeforeWeight(weight.weightdata);
                  break;
              case "after_weight_img":
                  setAfterWeight(weight.weightdata);
                  break;
              case "final_weight_img":
                  setBarcodeWeight(weight.weightdata);
                  break;
              default:
                  console.warn("Invalid field:", fieldName);
          }
      } catch (err) {
          console.error("Error fetching weight:", err);
      }
      } else {
        console.error("Image URL is not found for the given field.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const toggleWebcam = (field) => {
    setWebcamVisible((prev) => !prev);
    setCurrentField(field);
  };

  const base64ToFile = (base64Data, filename, mimeType) => {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset++) {
      const byte = byteCharacters.charCodeAt(offset);
      byteArrays.push(byte);
    }

    const byteArray = new Uint8Array(byteArrays);
    return new File([byteArray], filename, { type: mimeType });
  };

 
const captureImage = () => {
  if (webcamRef.current) {
    const video = webcamRef.current.video;
    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth; 
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg", 1.0); 
    const file = base64ToFile(image, "captured-image.jpg", "image/jpeg");

    uploadImage(file, currentField);
      // extractDigitalNumber(image);
  }
};


 
  return (
    showPopup && (
      <div className="popup-2">
        <div className="popup-contentt" ref={popupRef}>
          <div className="clos">
            <div onClick={closePopup} className="close-button">
              <FontAwesomeIcon style={{ marginLeft: "28rem" }} icon={faXmark} />
            </div>
          </div>
          <form className="in-position">
            <div>
              <label>Product Number:</label>
              <input
                style={{ width: "30rem" }}
                type="text"
                value={transform_text(product.product_number)}
                onChange={(e) => setProductNumber(e.target.value)}
                placeholder="Enter Product Number"
              />
            </div>

            <div>
              <label>Before Weight:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ width: "30rem" }}
                  type="number"
                  value={beforeWeight}
                  onChange={(e) => setBeforeWeight(e.target.value)}
                  // id="digitalNumber"
                  // value={digitalNumber}
                  // onChange={(e) => setDigitalNumber(e.target.value)}
                  placeholder="Enter Before Weight"
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  {capturedImages.before_weight_img && (
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+capturedImages.before_weight_img}
                      alt="Captured"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}

                  <CameraAltIcon
                    className="exclude-from-pdf"
                    onClick={() => toggleWebcam("before_weight_img")}
                    style={{ cursor: "pointer" }}
                  />
                  <Link
                    className="exclude-from-pdf"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (capturedImages.before_weight_img) {
                        setBeforeWeightPreview(
                          capturedImages.before_weight_img
                        );
                      }
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Preview
                  </Link>
                </div>
              </div>
              <div>
                {beforeWeightPreview && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <h3> Before Weight Preview Image</h3>
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+beforeWeightPreview}
                      alt="Preview"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <br />
                    <Button
                      onClick={() => setBeforeWeightPreview(null)}
                      size="small"
                      variant="outlined"
                      style={{ marginTop: "10px" }}
                    >
                      Close Preview
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label>After Weight:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ width: "30rem" }}
                  type="number"
                  value={afterWeight}
                  onChange={(e) => setAfterWeight(e.target.value)}
                  placeholder="Enter After Weight"
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  {capturedImages.after_weight_img && (
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+capturedImages.after_weight_img}
                      alt="Captured"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}

                  <CameraAltIcon
                    className="exclude-from-pdf"
                    onClick={() => toggleWebcam("after_weight_img")}
                    style={{ cursor: "pointer" }}
                  />
                  <Link
                    className="exclude-from-pdf"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (capturedImages.after_weight_img) {
                        setAfterWeightPreview(capturedImages.after_weight_img);
                      }
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Preview
                  </Link>
                </div>
              </div>
              <div>
                {afterWeightPreview && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <h3>After Weight Preview Image</h3>
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+afterWeightPreview}
                      alt="Preview"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <br />
                    <Button
                      onClick={() => setAfterWeightPreview(null)}
                      size="small"
                      variant="outlined"
                      style={{ marginTop: "10px" }}
                    >
                      Close Preview
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label>Difference:</label>
              <input
                style={{ width: "30rem" }}
                type="number"
                value={difference}
                onChange={(e) => setDifference(e.target.value)}
                placeholder="Enter Difference Weight"
              />
            </div>
            <div>
              <label>Adjustment:</label>
              <input
                style={{ width: "30rem" }}
                type="number"
                value={adjustment}
                onChange={(e) => setAdjustment(e.target.value)}
                placeholder="Enter Adjustment Weight"
              />
            </div>
            <div>
              <label>Enamel Weight:</label>
              <input
                style={{ width: "30rem" }}
                type="number"
                value={finalWeight}
                onChange={(e) => setFinalWeight(e.target.value)}
                placeholder="Enter Enamel Weight"
              />
            </div>
            <div>
              <label>Final Weight:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ width: "30rem" }}
                  type="number"
                  value={barcodeWeight}
                  onChange={(e) =>setBarcodeWeight(e.target.value)}
                  placeholder="Enter Final Weight"
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                  }}
                >
                  {capturedImages.final_weight_img && (
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+capturedImages.final_weight_img}
                      alt="Captured"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  )}

                  <CameraAltIcon
                    className="exclude-from-pdf"
                    onClick={() => toggleWebcam("final_weight_img")}
                    style={{ cursor: "pointer" }}
                  />
                  <Link
                    className="exclude-from-pdf"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (capturedImages.final_weight_img) {
                        setFinalWeightPreview(capturedImages.final_weight_img);
                      }
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Preview
                  </Link>
                </div>
              </div>
              <div>
                {finalWeightPreview && (
                  <div
                    style={{
                      marginTop: "20px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <h3>Final Weight Preview Image</h3>
                    <img
                      src={REACT_APP_BACKEND_SERVER_URL+finalWeightPreview}
                      alt="Preview"
                      style={{
                        maxWidth: "300px",
                        maxHeight: "300px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <br />
                    <Button
                      onClick={() => setFinalWeightPreview(null)}
                      size="small"
                      variant="outlined"
                      style={{ marginTop: "10px" }}
                    >
                      Close Preview
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>

          <br></br>
          {webcamVisible && (
            <div
              className="centered-webcam"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "10px 0",
              }}
            >
              <Webcam
                ref={webcamRef}
                style={{
                  width: "200px",
                  height: "300px",
                  // border: "2px solid #ccc",
                }}
                screenshotFormat="image/jpeg"
                screenshotQuality={1}
              />
              <Button
                onClick={() => captureImage("image")}
                variant="contained"
                size="small"
                style={{
                  marginTop: "10px",
                  backgroundColor: "#25274D",
                  color: "white",
                }}
              >
                Capture
              </Button>
            </div>
          )}

          <div
            className="button-group"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              className="exclude-from-pdf"
              onClick={handleSave}
              variant="contained"
              size="small"
              style={{
                backgroundColor: "#25274D",
                color: "white",
                width: "20%",
              }}
            >
              Save
            </Button>

            <div style={{ display: "flex", gap: "10px" }}>
            
              <Button
                onClick={() => handleBulkExportPdf(product)}
               

                style={{
                  marginTop: "1rem",
                  marginLeft: "4rem",
                  height: "2rem",
                  width: "8rem",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  borderRadius: "5px",
                  backgroundColor: "rgb(36, 36, 66)",
                  color: "white",
                }}
              >
                Print Label
              </Button>
              <Button
                className="exclude-from-pdf"
                onClick={handleExportdetailsPdf}
                variant="contained"
                size="small"
                style={{ backgroundColor: "#25274D", color: "white" }}
              >
                Export Details as PDF
              </Button>
            </div>
          </div>
          {showBarcode && selectedProductNo && (
            <div
              ref={barcodeRef}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                marginLeft: "5rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginLeft: "35px",
                }}
              >
                <Barcode value={selectedProductNo || ""} size={90} />
              </div>
              <div style={{ display: "flex", gap: "4rem" }}>
                <div
                  style={{
                    fontSize: "10px",
                    marginLeft: "0.3rem",
                    // fontWeight: "bold",
                    marginBottom: "1rem",
                  }}
                >
                  <div>{product.barcode_weight}</div>
                  <div>{transform_text(product.product_number)}</div>
                </div>
                <div>
                  {" "}
                  <img
                    src={imagess}
                    alt="jewelery"
                    style={{ height: "80px", width: "80px" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default WeightFormPopup;

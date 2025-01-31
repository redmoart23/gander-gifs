import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { DialogHeader } from "./components/ui/dialog";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Confetti from "react-confetti";
//const genderImages = ["AZUL.gif", "ROSADO.gif"];

export default function StarGame() {
  const [stars, setStars] = useState(
    Array(9).fill("DURMIENDO.gif") // Adjust the number of stars
  );

  const [activateDialog, setActivateDialog] = useState(false);

  const getRandomGender = () => {
    const stars = [
      "AZUL.gif",
      "AZUL.gif",
      "AZUL.gif",
      "AZUL.gif",
      "AZUL.gif",
      "AZUL.gif",
      "ROSADO.gif",
      "AZUL.gif",
      "ROSADO.gif",
    ];

    return stars[Math.floor(Math.random() * stars.length)];
  };
  const handleStarClick = (index: number) => {
    setStars((prevStars) => {
      const updatedStars = prevStars.map((star, i) =>
        i === index
          ? star === "DURMIENDO.gif"
            ? getRandomGender()
            : "DURMIENDO.gif"
          : star
      );

      // Check if all stars have been clicked at least once
      if (!updatedStars.includes("DURMIENDO.gif")) {
        setTimeout(() => {
          setActivateDialog(true);
        }, 500);
      }

      return updatedStars;
    });
  };

  return (
    <div className="min-h-screen bg-[#000] flex flex-col items-center justify-center p-4 relative">
      {activateDialog && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <Dialog open={activateDialog} onOpenChange={setActivateDialog}>
        <AnimatePresence>
          {activateDialog && (
            <DialogContent asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
              >
                <div className="bg-slate-900 w-[400px] h-[200px] overflow-hidden flex flex-col rounded-lg shadow-xl p-6 relative justify-center">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl font-semibold text-amber-50">
                      ¡Sorpresa!
                    </DialogTitle>
                  </DialogHeader>
                  <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    onClick={() => setActivateDialog(false)}
                  >
                    <X className="h-5 w-5 text-amber-50" />
                    <span className="sr-only">Close</span>
                  </button>
                  <div className="text-center py-6">
                    <p className="text-xl text-blue-300">
                      ¡Es un Niño! <span className="text-4xl">🎉</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
      {/* Moon character */}
      <div className="relative mb-6">
        <img className="w-60 h-40" src="moon.gif" alt="moon" />
      </div>

      {/* Text */}
      <div className="text-center mb-8">
        <h1 className="text-white text-xl mb-2">
          Nuestro bebé, ¿Será niño o niña?
        </h1>
        <p className="text-gray-400 text-sm">
          Presiona las estrellitas para despertarlas y descubrirlo
        </p>
      </div>

      {/* Stars grid */}
      <div className="grid grid-cols-3 gap-4 cursor-pointer">
        {stars.map((src, index) => (
          <img
            onClick={() => handleStarClick(index)}
            key={index}
            className="w-30 h-30"
            src={src}
            alt="sleep"
          />
        ))}
      </div>
    </div>
  );
}

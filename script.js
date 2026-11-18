document.addEventListener("DOMContentLoaded", () => {
    // Image setup: replace an empty ASSETS value with a resized, transparent
    // data:image/webp;base64,... or data:image/png;base64,... URI (aim for <=150 KB).
    const ASSETS = {
      cone: "",
      scoopStrawberry: "",
      scoopMint: "",
      scoopChocolate: "",
      scoopVanilla: "",
      sprinkles: "",
      cherry: "",
      wafer: "",
      sauceBottle: "",
      icecreamTruck: "",
      cake: "",
      candle: "",
      sundae: "",
      jar: "",
      background: ""
    };

    const CONFIG = {
      NAME: "Lieam",
      AGE: "",
      MUSIC_SRC: "",
      SIGNATURE: "Someone who thinks the world of you",
      SHORT_NOTE: "Hello, Lieam! Maybe this isn't much, but I wanted to wish you a very happy birthday. I hope all the things you've been working so hard for pay off. You are one of the hardest-working people I know, and you deserve to feel celebrated today.",
      REASONS: [
        "You are one of the hardest-working people I know.",
        "Your dedication to your studies inspires me.",
        "You became a light that helped me do things I hadn't done before.",
        "You inspired me to do my best in our senior high academics.",
        "You have made a bigger difference in my life than you may realize.",
        "You deserve every blessing and good thing this life can bring."
      ],
      LETTER: [
        "Hello, Lieam. Maybe this isn't much, but I truly wanted to wish you a very happy birthday.",
        "You are one of the hardest-working people I have ever known. I hope all the effort and care you put into the things you do will pay off.",
        "I also want to thank you for becoming a light in my life. Because of you, I found the courage to do things I had never done before.",
        "You may not know it, but you became one of my inspirations in my academics, especially during our senior high years. Your example encouraged me to keep trying and believe I could do more.",
        "May God bless you with every good thing and fill your life with the blessings you deserve. I hope this new year brings you joy, success, and many reasons to smile.",
        "Happy birthday, Lieam. Thank you for inspiring me, and thank you for being you."
      ],
      FLAVORS: [
        { name: "Berry Bestie", emoji: "🍓", asset: "scoopStrawberry", color: "#f6b3bd", note: "Sweet, bright, and impossible not to love." },
        { name: "Mint to Shine", emoji: "🌿", asset: "scoopMint", color: "#b7e4c9", note: "Cool, calm, and quietly amazing." },
        { name: "Vanilla Star", emoji: "⭐", asset: "scoopVanilla", color: "#ffe2a6", note: "A classic with a little extra magic." },
        { name: "Blue Sky", emoji: "🫐", asset: "scoopVanilla", color: "#b8d9f1", note: "For all the lovely things ahead." },
        { name: "Choco Cheer", emoji: "🍫", asset: "scoopChocolate", color: "#c89a8d", note: "A little comfort in every scoop." },
        { name: "Peachy Keen", emoji: "🍑", asset: "scoopStrawberry", color: "#ffc9a9", note: "A sunny scoop for a sunny soul." }
      ],
      TOPPINGS: [
        { name: "Rainbow sprinkles", emoji: "🌈", asset: "sprinkles" },
        { name: "Cherry", emoji: "🍒", asset: "cherry" },
        { name: "Waffle wafer", emoji: "🍪", asset: "wafer" },
        { name: "Chocolate drizzle", emoji: "🍫", asset: "sauceBottle" },
        { name: "Tiny star", emoji: "⭐", asset: "sprinkles" },
        { name: "Marshmallow", emoji: "☁️", asset: "scoopVanilla" }
      ],
      BALLOONS: [
        "You make ordinary days feel brighter.",
        "Your hard work deserves to be celebrated.",
        "You are a light in the lives around you.",
        "You can do more than you know.",
        "May this year bring you gentle, happy surprises.",
        "You are loved, today and every day."
      ],
      GIFT_NOTE: "A little reminder to keep close: the kindness and light you share with the world matter more than you know. I hope the year ahead brings you the same joy you give to everyone around you."
    };

    const SCENE_NAMES = ["envelope","welcome","hub","cone","flavors","toppings","melt","catch","balloons","scratch","cake","gift","memories","wish","note","reasons","letter","finale"];
    const ADVENTURE_SCENES = ["cone","flavors","toppings","melt","catch","balloons","scratch","cake","gift","memories","wish","note","reasons","letter","finale"];
    const HUB_DESTINATIONS = [
      { scene: "cone", emoji: "🍦", title: "Make a birthday scoop", note: "Choose flavors, toppings, and a little magic." },
      { scene: "catch", emoji: "💗", title: "Catch the hearts", note: "A tiny game with a very sweet reward." },
      { scene: "balloons", emoji: "🎈", title: "Pop a surprise", note: "There is a kind little message in every balloon." },
      { scene: "scratch", emoji: "🃏", title: "Scratch a birthday card", note: "A hidden wish is waiting underneath." },
      { scene: "cake", emoji: "🕯️", title: "Make a birthday wish", note: "The candle is glowing just for you." },
      { scene: "gift", emoji: "🎁", title: "Open your gift", note: "A small surprise, wrapped with love." },
      { scene: "memories", emoji: "📸", title: "Birthday photobooth", note: "Take a picture with a birthday frame to keep." },
      { scene: "wish", emoji: "🌟", title: "Make a wish", note: "Leave a hope for the year ahead." },
      { scene: "note", emoji: "💌", title: "Read a birthday note", note: "A few words from the heart." },
      { scene: "reasons", emoji: "💗", title: "Discover your reasons", note: "Turn over each little reminder." },
      { scene: "letter", emoji: "✉️", title: "Open the final letter", note: "The most important words can wait for you." },
      { scene: "finale", emoji: "🎆", title: "Celebrate", note: "Your birthday ending, whenever you're ready." }
    ];
    const ACHIEVEMENTS = [
      { id: "world-wanderer", icon: "✨", title: "First little adventure", note: "Stepped into the birthday world." },
      { id: "sundae-artist", icon: "🍨", title: "Sundae artist", note: "Created a birthday scoop with toppings." },
      { id: "heart-catcher", icon: "💗", title: "Heart catcher", note: "Caught ten hearts in the birthday game." },
      { id: "balloon-buddy", icon: "🎈", title: "Balloon buddy", note: "Found every message in the balloons." },
      { id: "gift-opener", icon: "🎁", title: "Gift opener", note: "Unwrapped the birthday surprise." },
      { id: "wish-maker", icon: "🌟", title: "Wish maker", note: "Sent a wish into the starry sky." },
      { id: "world-explorer", icon: "🗺️", title: "Curious heart", note: "Visited every birthday destination." },
      { id: "story-finisher", icon: "💌", title: "A story to keep", note: "Reached the birthday finale." }
    ];
    const scene = document.getElementById("scene");
    const progressFill = document.getElementById("progressFill");
    const progressLabel = document.getElementById("progressLabel");
    const scoopCount = document.getElementById("scoopCount");
    const toast = document.getElementById("toast");
    const musicToggle = document.getElementById("musicToggle");
    const volumeSlider = document.getElementById("volume");
    let currentScene = "envelope";
    let sceneHistory = [];
    let visitedScenes = new Set();
    let badges = new Set();
    let poppedBalloons = new Set();
    let photoboothStream;
    let photoboothObjectUrl;
    let selectedCone = "";
    let selectedFlavors = [];
    let toppings = [];
    let saucePaths = [];
    let sauceMode = false;
    let wishDraft = "";
    let wishSubmitted = false;
    let scratchContext;
    let scratchPercent = 0;
    let meltTimer = 12;
    let meltCool = 100;
    let meltInterval;
    let catchScore = 0;
    let catchTime = 30;
    let catchInterval;
    let spawnInterval;
    let catchPaused = false;
    let catchFinished = false;
    let bestHeartScore = 0;
    let giftOpened = false;
    let candleOut = false;
    let birthdayWish = "";
    let birthdayWishSaved = false;
    let noteComplete = false;
    let noteTypingTimer;
    let letterLineIndex = 0;
    let revealedReasons = new Set();
    let hornTaps = 0;
    let moonTaps = 0;
    let audioContext;
    let masterGain;
    let musicInterval;
    let musicAudio;
    let musicOn = false;
    let volume = Number(volumeSlider.value);
    let toastTimer;
    let lastTrailAt = 0;
    let micStream;
    let micContext;
    let micFrame = 0;
    let wakeLock;
    let motionReady = false;
    let lastShake = 0;
    let threeRenderer;
    let threeFrame = 0;
    let threeResume;
    let threeDispose;
    let threeLoadPromise;
    let sceneScrollTrigger;
    let sceneObserver;
    let wishFrame = 0;
    let wishParticles = [];
    let restoreMusicOnVisibility = false;
    let hasInteracted = false;
    const sceneTransitionTimers = new Set();
    const previousScenes = {
      welcome: "envelope",
      hub: "welcome",
      cone: "hub",
      flavors: "cone",
      toppings: "flavors",
      melt: "toppings",
      catch: "melt",
      balloons: "catch",
      scratch: "balloons",
      cake: "scratch",
      gift: "cake",
      memories: "gift",
      wish: "memories",
      note: "wish",
      reasons: "note",
      letter: "reasons",
      finale: "letter"
    };
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motionPreferenceKey = "lieam-birthday-reduce-motion";
    try { reducedMotion = reducedMotion || localStorage.getItem(motionPreferenceKey) === "true"; }
    catch (error) { console.info("Motion preferences could not be restored.", error); }
    document.body.classList.toggle("reduce-motion", reducedMotion);
    const storageKey = "lieam-birthday-parlor-v1";

    function saveProgress() {
      try {
        localStorage.setItem(storageKey, JSON.stringify({
          scene: currentScene,
          history: sceneHistory,
          visited: [...visitedScenes],
          badges: [...badges],
          poppedBalloons: [...poppedBalloons],
          catchScore,
          catchTime,
          catchFinished,
          bestHeartScore,
          giftOpened,
          candleOut,
          noteComplete,
          birthdayWish,
          birthdayWishSaved,
          wishDraft,
          wishSubmitted,
          scratchPercent,
          cone: selectedCone,
          flavors: selectedFlavors,
          toppings,
          saucePaths,
          reasons: [...revealedReasons],
          letterLine: letterLineIndex
        }));
      } catch (error) {
        console.info("Birthday progress could not be saved in this browser.", error);
      }
    }

    function restoreProgress() {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
        if (!saved || !SCENE_NAMES.includes(saved.scene) || saved.scene === "envelope") return;
        currentScene = saved.scene;
        sceneHistory = Array.isArray(saved.history) ? saved.history.filter(item => SCENE_NAMES.includes(item)).slice(-40) : [];
        visitedScenes = new Set(Array.isArray(saved.visited) ? saved.visited.filter(item => ADVENTURE_SCENES.includes(item)) : []);
        const validBadges = new Set(ACHIEVEMENTS.map(item => item.id));
        badges = new Set(Array.isArray(saved.badges) ? saved.badges.filter(item => validBadges.has(item)) : []);
        poppedBalloons = new Set(Array.isArray(saved.poppedBalloons) ? saved.poppedBalloons.filter(item => Number.isInteger(item) && item >= 0 && item < CONFIG.BALLOONS.length) : []);
        catchScore = Number.isInteger(saved.catchScore) ? Math.max(0, Math.min(10, saved.catchScore)) : 0;
        catchTime = Number.isInteger(saved.catchTime) ? Math.max(0, Math.min(30, saved.catchTime)) : 30;
        catchFinished = saved.catchFinished === true;
        bestHeartScore = Number.isInteger(saved.bestHeartScore) ? Math.max(0, saved.bestHeartScore) : 0;
        giftOpened = saved.giftOpened === true;
        candleOut = saved.candleOut === true;
        noteComplete = saved.noteComplete === true;
        birthdayWish = typeof saved.birthdayWish === "string" ? saved.birthdayWish.slice(0, 120) : "";
        birthdayWishSaved = saved.birthdayWishSaved === true;
        wishDraft = typeof saved.wishDraft === "string" ? saved.wishDraft.slice(0, 120) : "";
        wishSubmitted = saved.wishSubmitted === true;
        scratchPercent = typeof saved.scratchPercent === "number" && Number.isFinite(saved.scratchPercent) ? Math.max(0, Math.min(1, saved.scratchPercent)) : 0;
        selectedCone = ["waffle", "sugar", "cup"].includes(saved.cone) ? saved.cone : "";
        selectedFlavors = Array.isArray(saved.flavors)
          ? [...new Set(saved.flavors.filter(index => Number.isInteger(index) && index >= 0 && index < CONFIG.FLAVORS.length))].slice(0, 3)
          : [];
        const validToppings = new Set(CONFIG.TOPPINGS.map(item => item.emoji));
        toppings = Array.isArray(saved.toppings)
          ? saved.toppings.filter(item => validToppings.has(item)).slice(0, 12)
          : [];
        saucePaths = Array.isArray(saved.saucePaths)
          ? saved.saucePaths.filter(isValidSaucePath).slice(0, 12)
          : [];
        revealedReasons = new Set(Array.isArray(saved.reasons)
          ? saved.reasons.filter(index => Number.isInteger(index) && index >= 0 && index < CONFIG.REASONS.length)
          : []);
        letterLineIndex = Number.isInteger(saved.letterLine) ? Math.max(0, Math.min(saved.letterLine, CONFIG.LETTER.length)) : 0;
      } catch (error) {
        console.info("A saved birthday adventure could not be restored.", error);
      }
    }

    function buzz(pattern = 18) {
      if (!hasInteracted) return;
      try {
        if ("vibrate" in navigator) navigator.vibrate(pattern);
      } catch (error) {
        console.info("Haptics are unavailable.", error);
      }
    }

    function isValidSaucePath(path) {
      if (typeof path !== "string" || path.length > 4096) return false;
      const match = path.match(/^M\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)(?:\s+L\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)){1,240}$/);
      if (!match) return false;
      const values = path.match(/-?\d+(?:\.\d+)?/g).map(Number);
      return values.every((value, index) => Number.isFinite(value) && value >= 0 && value <= (index % 2 ? 180 : 300));
    }

    function scheduleSceneTransition(from, to, delay) {
      const timer = window.setTimeout(() => {
        sceneTransitionTimers.delete(timer);
        if (currentScene === from) go(to);
      }, delay);
      sceneTransitionTimers.add(timer);
    }

    function stopThreeCone() {
      if (threeFrame) cancelAnimationFrame(threeFrame);
      threeFrame = 0;
      threeResume = undefined;
      if (threeDispose) threeDispose();
      threeDispose = undefined;
      threeRenderer = undefined;
    }

    function loadThreeLibrary() {
      if (window.THREE) return Promise.resolve(true);
      if (threeLoadPromise) return threeLoadPromise;
      threeLoadPromise = import("https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.js")
        .then(THREE => {
          window.THREE = THREE;
          return true;
        })
        .catch(error => {
          console.info("Three.js could not load; the animated CSS cone remains available.");
          return false;
        });
      return threeLoadPromise;
    }

    function initSceneMotion() {
      const card = scene.querySelector(".scene-card");
      if (!card) return;
      if (reducedMotion || document.hidden) {
        card.classList.add("scene-static");
        return;
      }
      if (window.gsap) {
        window.gsap.fromTo(card, { y: 18, scale: .985 }, { y: 0, scale: 1, duration: .65, ease: "back.out(1.25)" });
        window.gsap.from(card.querySelectorAll(".eyebrow,h1,h2,.lead"), { opacity: 0, y: 10, duration: .38, stagger: .045, delay: .12, ease: "power2.out" });
        if (window.ScrollTrigger) {
          window.gsap.registerPlugin(window.ScrollTrigger);
          sceneScrollTrigger = window.ScrollTrigger.create({ trigger: card, start: "top 95%", onEnter: () => card.classList.add("scene-visible") });
        }
      } else if (card.animate) {
        card.animate([{ transform: "translateY(15px) scale(.99)" }, { transform: "translateY(0) scale(1)" }], { duration: 480, easing: "cubic-bezier(.2,.8,.2,1)" });
      }
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
          for (const entry of entries) if (entry.isIntersecting) {
            entry.target.classList.add("scene-visible");
            observer.unobserve(entry.target);
          }
        }, { threshold: .12 });
        sceneObserver = observer;
        observer.observe(card);
      }
    }

    function initThreeCone() {
      const holder = document.getElementById("heroCone");
      if (!holder) return;
      if (configuredImage("cone")) return;
      if (reducedMotion) return;
      if (document.hidden) return;
      if (!window.THREE) {
        holder.addEventListener("pointermove", event => {
          const box = holder.getBoundingClientRect();
          holder.style.setProperty("--tilt-x", `${((event.clientX - box.left) / box.width - .5) * 18}deg`);
          holder.style.setProperty("--tilt-y", `${((event.clientY - box.top) / box.height - .5) * -18}deg`);
        }, { passive: true });
        loadThreeLibrary().then(available => {
          if (available && holder.isConnected && currentScene === "welcome") initThreeCone();
        });
        return;
      }
      let renderer;
      try {
        const THREE = window.THREE;
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        threeRenderer = renderer;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(110, 112, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.domElement.setAttribute("aria-hidden", "true");
        holder.appendChild(renderer.domElement);
        const world = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, 110 / 112, .1, 100);
        camera.position.z = 5;
        world.add(new THREE.AmbientLight(0xffffff, 2));
        const light = new THREE.DirectionalLight(0xffffff, 2.1);
        light.position.set(-2, 4, 5);
        world.add(light);
        const cone = new THREE.Group();
        cone.scale.setScalar(.78);
        world.add(cone);
        const wafer = new THREE.Mesh(new THREE.ConeGeometry(.68, 1.35, 32), new THREE.MeshStandardMaterial({ color: 0xd79c60, roughness: .8 }));
        wafer.position.y = -.65;
        cone.add(wafer);
        [[0,.12,0xffa4b9],[0,.65,0xfff0cc],[0,1.12,0xb7e4c9]].forEach(([x,y,color]) => {
          const scoop = new THREE.Mesh(new THREE.SphereGeometry(.48, 24, 18), new THREE.MeshStandardMaterial({ color, roughness: .48 }));
          scoop.position.set(x, y, .02);
          cone.add(scoop);
        });
        const pointer = { x: 0, y: 0 };
        holder.addEventListener("pointermove", event => {
          const box = holder.getBoundingClientRect();
          pointer.x = ((event.clientX - box.left) / box.width - .5) * .55;
          pointer.y = ((event.clientY - box.top) / box.height - .5) * .4;
        }, { passive: true });
        const animate = () => {
          if (!holder.isConnected || currentScene !== "welcome" || document.hidden) { threeFrame = 0; return; }
          cone.rotation.y += (pointer.x + Math.sin(performance.now() * .00045) * .12 - cone.rotation.y) * .035;
          cone.rotation.x += (pointer.y - cone.rotation.x) * .035;
          renderer.render(world, camera);
          threeFrame = requestAnimationFrame(animate);
        };
        threeResume = () => {
          if (!threeFrame && holder.isConnected && !document.hidden) threeFrame = requestAnimationFrame(animate);
        };
        threeDispose = () => {
          world.traverse(item => {
            if (item.geometry) item.geometry.dispose();
            if (item.material) {
              const materials = Array.isArray(item.material) ? item.material : [item.material];
              materials.forEach(material => material.dispose());
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
        holder.querySelector(".hero-cone-fallback").hidden = true;
        threeResume();
      } catch (error) {
        if (threeDispose) threeDispose();
        else if (renderer) {
          renderer.dispose();
          renderer.domElement.remove();
        }
        threeRenderer = undefined;
        threeFrame = 0;
        const fallback = holder.querySelector(".hero-cone-fallback");
        if (fallback) fallback.hidden = false;
        console.info("3D cone unavailable; using the CSS illustration.", error);
      }
    }

    async function requestMotionAccess() {
      if (motionReady) return;
      try {
        for (const Sensor of [window.DeviceMotionEvent, window.DeviceOrientationEvent]) {
          if (Sensor && typeof Sensor.requestPermission === "function" && await Sensor.requestPermission() !== "granted") {
            toastMessage("Motion permission was declined. You can still tap to make sprinkles fall.");
            return;
          }
        }
        window.addEventListener("devicemotion", event => {
          const a = event.accelerationIncludingGravity;
          if (!a) return;
          const strength = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
          if (strength > 34 && Date.now() - lastShake > 1800) {
            lastShake = Date.now();
            sprinkleBurst(24);
            buzz([12, 22, 12]);
          }
          if (currentScene === "welcome" && document.getElementById("heroCone")) {
            document.getElementById("heroCone").style.setProperty("--tilt-x", `${Math.max(-15, Math.min(15, (a.y || 0) * 1.2))}deg`);
          }
        }, { passive: true });
        window.addEventListener("deviceorientation", event => {
          const hero = document.getElementById("heroCone");
          if (currentScene === "welcome" && hero) {
            hero.style.setProperty("--tilt-x", `${Math.max(-15, Math.min(15, (event.gamma || 0) * .35))}deg`);
            hero.style.setProperty("--tilt-y", `${Math.max(-12, Math.min(12, (event.beta || 0) * -.22))}deg`);
          }
        }, { passive: true });
        motionReady = true;
      } catch (error) {
        console.info("Motion sensors unavailable; pointer and tap interactions remain enabled.", error);
      }
    }

    function stopMicrophone() {
      if (micFrame) cancelAnimationFrame(micFrame);
      micFrame = 0;
      if (micStream) micStream.getTracks().forEach(track => track.stop());
      micStream = undefined;
      if (micContext && micContext.state !== "closed") micContext.close().catch(error => console.info("Microphone audio context could not close.", error));
      micContext = undefined;
    }

    async function startMicrophone() {
      const status = document.getElementById("micStatus");
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !AudioContextClass) {
          throw new Error("Microphone access is not available in this browser or page context.");
        }
        stopMicrophone();
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
        if (currentScene !== "cake") {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        micStream = stream;
        const context = new AudioContextClass();
        micContext = context;
        const analyser = context.createAnalyser();
        analyser.fftSize = 512;
        context.createMediaStreamSource(stream).connect(analyser);
        const samples = new Uint8Array(analyser.fftSize);
        let loudFrames = 0;
        if (status) status.textContent = "Microphone ready — give a gentle birthday blow! You can tap the candle too.";
        const check = () => {
          if (!micStream || currentScene !== "cake") return;
          analyser.getByteTimeDomainData(samples);
          let sum = 0;
          for (const sample of samples) { const delta = (sample - 128) / 128; sum += delta * delta; }
          const rms = Math.sqrt(sum / samples.length);
          loudFrames = rms > .105 ? loudFrames + 1 : Math.max(0, loudFrames - 1);
          if (loudFrames > 8) { extinguishCandle(); return; }
          micFrame = requestAnimationFrame(check);
        };
        micFrame = requestAnimationFrame(check);
      } catch (error) {
        if (status) status.textContent = "Microphone unavailable or permission denied — tap the candle button instead.";
        toastMessage("No microphone? No problem — tap to blow out the candle.");
        stopMicrophone();
      }
    }

    function initWishCanvas() {
      const canvas = document.getElementById("wishCanvas");
      if (!canvas) return;
      const box = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      wishParticles = [];
      const colors = ["#f48da6","#f3c76e","#a9dec9","#a9d8ec","#d6a5de"];
      const width = box.width, height = box.height;
      const animate = () => {
        if (!canvas.isConnected || document.hidden) { wishFrame = 0; return; }
        context.clearRect(0, 0, width, height);
        for (const particle of wishParticles) {
          particle.vy += .12;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.y > height - 8) { particle.y = height - 8; particle.vy *= -.62; particle.vx *= .91; }
          context.save();
          context.translate(particle.x, particle.y);
          context.rotate(particle.rotation += particle.spin);
          context.fillStyle = particle.color;
          context.fillRect(-3, -1.5, 6, 3);
          context.restore();
        }
        wishFrame = requestAnimationFrame(animate);
      };
      if (!wishFrame) wishFrame = requestAnimationFrame(animate);
    }

    function fillWishJar() {
      const canvas = document.getElementById("wishCanvas");
      if (!canvas) return;
      const bounds = canvas.getBoundingClientRect();
      const colors = ["#f48da6","#f3c76e","#a9dec9","#a9d8ec","#d6a5de"];
      wishParticles = Array.from({ length: window.innerWidth < 600 ? 45 : 85 }, () => ({
        x: Math.random() * bounds.width,
        y: -Math.random() * bounds.height,
        vx: (Math.random() - .5) * 2.4,
        vy: Math.random() * 2,
        rotation: Math.random() * 6,
        spin: (Math.random() - .5) * .12,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      initWishCanvas();
    }

    const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

    const svgFallbacks = {
      cone: '<path d="M66 110h68L105 228z" fill="url(#wafer)"/><path d="m75 120 51 84m-47-101 55 90m-42-90-31 45m61-45-49 72" fill="none" stroke="#99653e" stroke-width="3" opacity=".55"/><circle cx="100" cy="93" r="37" fill="url(#berry)"/><circle cx="81" cy="73" r="9" fill="#fff" opacity=".45"/><circle cx="129" cy="67" r="34" fill="url(#vanilla)"/><circle cx="121" cy="49" r="8" fill="#fff" opacity=".65"/>',
      scoopStrawberry: '<circle cx="100" cy="105" r="61" fill="url(#berry)"/><path d="M59 83q16-35 47-31M61 120q18 36 53 31" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".35"/><circle cx="74" cy="76" r="8" fill="#fff" opacity=".55"/>',
      scoopMint: '<circle cx="100" cy="105" r="61" fill="url(#mint)"/><path d="M57 111q12-43 50-47m-37 76q24 16 53 0" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".48"/><circle cx="75" cy="76" r="8" fill="#fff" opacity=".6"/>',
      scoopChocolate: '<circle cx="100" cy="105" r="61" fill="url(#chocolate)"/><path d="M58 107q15-39 49-43m-35 76q24 16 54-1" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".28"/><circle cx="75" cy="76" r="8" fill="#fff" opacity=".38"/>',
      scoopVanilla: '<circle cx="100" cy="105" r="61" fill="url(#vanilla)"/><path d="M58 108q16-43 50-45m-35 78q24 16 54 0" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".58"/><circle cx="75" cy="76" r="8" fill="#fff" opacity=".72"/>',
      sprinkles: '<g stroke-linecap="round" stroke-width="10"><path stroke="#f27f98" d="m50 82 22-18"/><path stroke="#f4c76e" d="m93 59 20 9"/><path stroke="#83cfae" d="m134 82 18-20"/><path stroke="#a9d8ec" d="m52 124 22 13"/><path stroke="#c38bc9" d="m98 108 22-15"/><path stroke="#f27f98" d="m132 137 19-9"/></g>',
      cherry: '<path d="M97 91C92 57 74 42 65 34m38 60c8-32 31-48 41-53" fill="none" stroke="#668e5c" stroke-width="8" stroke-linecap="round"/><path d="M93 89q20-25 46-17" fill="none" stroke="#8dbd70" stroke-width="6" stroke-linecap="round"/><circle cx="71" cy="132" r="33" fill="url(#berry)"/><circle cx="139" cy="126" r="34" fill="url(#chocolate)"/><ellipse cx="60" cy="119" rx="8" ry="15" fill="#fff" opacity=".48"/><ellipse cx="128" cy="111" rx="8" ry="15" fill="#fff" opacity=".38"/>',
      wafer: '<rect x="41" y="46" width="118" height="118" rx="17" fill="url(#wafer)"/><path d="M53 68h94M53 91h94M53 114h94M53 137h94M68 55v102m24-102v102m24-102v102m24-102v102" stroke="#9e6843" stroke-width="4" opacity=".48"/><path d="M51 61q45-18 97 0" fill="none" stroke="#fff" stroke-width="8" opacity=".3"/>',
      sauceBottle: '<path d="M78 40h45v25l12 15v80q0 17-17 17H77q-17 0-17-17V80l18-15z" fill="url(#chocolate)"/><path d="M85 34h31v13H85z" rx="4" fill="#f3c76e"/><rect x="72" y="93" width="56" height="47" rx="10" fill="#fff4df"/><path d="M82 112q18-20 36 0" fill="none" stroke="#8b5748" stroke-width="7" stroke-linecap="round"/><path d="M86 46h24" stroke="#fff" stroke-width="6" opacity=".35"/>',
      icecreamTruck: '<rect x="18" y="82" width="164" height="77" rx="20" fill="#ed8ca6"/><path d="M118 83h42q10 0 16 12l18 37v20q0 9-10 9h-66z" fill="#a8dfcd"/><rect x="135" y="95" width="40" height="29" rx="9" fill="#dff6f4"/><rect x="35" y="99" width="72" height="35" rx="8" fill="#fff2d6"/><circle cx="55" cy="165" r="17" fill="#684448" stroke="#fff" stroke-width="7"/><circle cx="154" cy="165" r="17" fill="#684448" stroke="#fff" stroke-width="7"/><path d="M88 76q4-36 32-27 19 6 13 27" fill="#f3b4c3" stroke="#fff" stroke-width="5"/><path d="M34 88h82" stroke="#fff" stroke-width="5" opacity=".8"/>',
      cake: '<ellipse cx="100" cy="174" rx="77" ry="16" fill="#e99cac"/><path d="M33 108q67 15 134 0v58q-67 17-134 0z" fill="url(#berry)"/><ellipse cx="100" cy="108" rx="67" ry="19" fill="#fff4df"/><path d="M54 111v22q10 15 19 0v-21m28 0v25q10 13 19 0v-25m24 0v22q10 15 19 0v-23" fill="#fff4df"/><path d="M45 99q10-16 20 0t20 0 20 0 20 0 20 0 20 0" fill="none" stroke="#d46c87" stroke-width="7" stroke-linecap="round"/>',
      candle: '<rect x="82" y="72" width="36" height="115" rx="12" fill="url(#vanilla)"/><path d="M82 97h36m-36 26h36m-36 26h36" stroke="#f087a0" stroke-width="9"/><path d="M100 72q-34-31 0-62 32 30 0 62" fill="#ffb54d"/><path d="M101 61q-17-18 0-34 18 19 0 34" fill="#fff4ab"/>',
      sundae: '<path d="M42 102h116l-17 86q-42 26-82 0z" fill="#a9d8ec" fill-opacity=".72" stroke="#fff" stroke-width="8"/><circle cx="70" cy="86" r="35" fill="url(#berry)"/><circle cx="113" cy="68" r="38" fill="url(#vanilla)"/><circle cx="143" cy="94" r="31" fill="url(#mint)"/><path d="M100 49q-8-20 5-35" fill="none" stroke="#668e5c" stroke-width="6"/><circle cx="107" cy="26" r="12" fill="#d84d67"/><path d="M53 123q43 12 95 0" fill="none" stroke="#fff" stroke-width="6" opacity=".8"/>',
      jar: '<path d="M58 44h84v20l12 15v86q0 21-20 21H66q-20 0-20-21V79l12-15z" fill="#b8e4d8" fill-opacity=".65" stroke="#fff" stroke-width="8"/><path d="M58 49h84m-92 32h100" stroke="#fff" stroke-width="8" stroke-linecap="round"/><g fill="#f48da6"><circle cx="80" cy="113" r="7"/><circle cx="116" cy="142" r="7"/></g><g fill="#f3c76e"><circle cx="124" cy="104" r="7"/><circle cx="89" cy="158" r="7"/></g><g fill="#a9d8ec"><circle cx="102" cy="122" r="7"/><circle cx="135" cy="158" r="7"/></g>',
      background: '<circle cx="42" cy="60" r="44" fill="#f6b3bd" opacity=".52"/><circle cx="157" cy="48" r="60" fill="#a9dec9" opacity=".45"/><circle cx="113" cy="150" r="55" fill="#f3c76e" opacity=".3"/><path d="M0 123q47-40 98 0t102 0v77H0z" fill="#fff8e9" opacity=".55"/>'
    };

    const fallbackCache = new Map();
    function fallbackImage(slot, color = "") {
      const key = `${slot}:${color}`;
      if (fallbackCache.has(key)) return fallbackCache.get(key);
      const colors = {
        berry: color || "#f48da6",
        mint: color || "#a9dec9",
        vanilla: color || "#ffe2a6",
        chocolate: color || "#986254",
        wafer: "#d7a36c"
      };
      const body = svgFallbacks[slot] || svgFallbacks.background;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220"><defs><radialGradient id="berry" cx="30%" cy="20%"><stop stop-color="#fff5ed"/><stop offset=".28" stop-color="${colors.berry}"/><stop offset="1" stop-color="#d86482"/></radialGradient><radialGradient id="mint" cx="30%" cy="20%"><stop stop-color="#fff"/><stop offset=".3" stop-color="${colors.mint}"/><stop offset="1" stop-color="#77b994"/></radialGradient><radialGradient id="vanilla" cx="30%" cy="20%"><stop stop-color="#fff"/><stop offset=".3" stop-color="${colors.vanilla}"/><stop offset="1" stop-color="#d7ad69"/></radialGradient><radialGradient id="chocolate" cx="30%" cy="20%"><stop stop-color="#e7c4a4"/><stop offset=".3" stop-color="${colors.chocolate}"/><stop offset="1" stop-color="#59362f"/></radialGradient><linearGradient id="wafer" x2="0" y2="1"><stop stop-color="#efc68d"/><stop offset="1" stop-color="${colors.wafer}"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#654149" flood-opacity=".2"/></filter></defs><g filter="url(#shadow)">${body}</g></svg>`;
      const source = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      fallbackCache.set(key, source);
      return source;
    }

    function configuredImage(slot, override = "") {
      const source = override || ASSETS[slot] || "";
      if (!source) return "";
      if (!/^data:image\/(?:png|webp|jpeg);base64,/i.test(source)) {
        console.warn(`Image slot "${slot}" needs a PNG, WebP, or JPEG base64 data URI. Using the built-in illustration.`);
        return "";
      }
      if (source.length > 205000) {
        console.warn(`Image slot "${slot}" is larger than about 150 KB. Resize/compress it for faster loading.`);
        return "";
      }
      return source;
    }

    function imageMarkup(slot, className, alt, color = "", override = "") {
      const source = configuredImage(slot, override) || fallbackImage(slot, color);
      return `<img class="${className}" data-asset="${slot}" data-fallback-color="${escapeHTML(color)}" src="${escapeHTML(source)}" alt="${escapeHTML(alt)}" loading="lazy" decoding="async">`;
    }

    document.addEventListener("error", event => {
      const image = event.target;
      if (!(image instanceof HTMLImageElement) || !image.dataset.asset) return;
      if (image.dataset.fallbackApplied === "true") { image.hidden = true; return; }
      image.dataset.fallbackApplied = "true";
      image.src = fallbackImage(image.dataset.asset, image.dataset.fallbackColor || "");
    }, true);
    const ageLine = CONFIG.AGE ? `Celebrating ${escapeHTML(CONFIG.AGE)} wonderful years for` : "A very happy birthday to";
    document.title = `${CONFIG.NAME}'s Birthday Parlor`;
    document.getElementById("brandName").textContent = `${CONFIG.NAME}'s Birthday Parlor`;
    const backgroundImage = configuredImage("background");
    if (backgroundImage) document.body.style.backgroundImage = `linear-gradient(#fff5eb8c,#eaf8f18c),url("${backgroundImage}")`;

    function updateProgress() {
      const explored = ADVENTURE_SCENES.filter(item => visitedScenes.has(item)).length;
      const amount = explored / ADVENTURE_SCENES.length * 100;
      const label = `${explored} of ${ADVENTURE_SCENES.length} places explored`;
      progressFill.style.width = `${amount}%`;
      scoopCount.textContent = String(explored);
      progressLabel.textContent = label;
      const progress = scene.parentElement.querySelector(".progress-wrap");
      progress.setAttribute("aria-valuenow", String(Math.round(amount)));
      progress.setAttribute("aria-valuetext", label);
    }

    function toastMessage(message) {
      toast.textContent = message;
      toast.classList.add("show");
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
    }

    function awardBadge(id) {
      if (badges.has(id)) return;
      if (!ACHIEVEMENTS.some(item => item.id === id)) return;
      badges.add(id);
      saveProgress();
      const badge = ACHIEVEMENTS.find(item => item.id === id);
      toastMessage(`${badge.icon} Birthday badge earned: ${badge.title}!`);
    }

    function startNoteTyping() {
      const visibleText = document.getElementById("noteVisibleText");
      const skipButton = document.querySelector('[data-action="skip-note"]');
      if (!visibleText || !skipButton) return;
      if (noteComplete) {
        visibleText.textContent = CONFIG.SHORT_NOTE;
        return;
      }
      const characters = Array.from(CONFIG.SHORT_NOTE);
      let index = 0;
      visibleText.textContent = "";
      noteTypingTimer = window.setInterval(() => {
        index++;
        visibleText.textContent = characters.slice(0, index).join("");
        if (index >= characters.length) {
          window.clearInterval(noteTypingTimer);
          noteTypingTimer = undefined;
          noteComplete = true;
          skipButton.textContent = "Open your birthday notes 💌";
          saveProgress();
        }
      }, 24);
    }

    function showInfoDialog(title, content) {
      const dialog = document.getElementById("infoDialog");
      document.getElementById("infoDialogContent").innerHTML = `<h2 id="infoDialogTitle">${title}</h2>${content}`;
      if (!dialog.open) dialog.showModal();
    }

    function showCollection() {
      const achievementItems = ACHIEVEMENTS.map(item => `<li class="${badges.has(item.id) ? "earned" : ""}"><span aria-hidden="true">${item.icon}</span><div><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.note)}</small></div><b>${badges.has(item.id) ? "Earned" : "Waiting"}</b></li>`).join("");
      showInfoDialog("Birthday badges", `<p class="dialog-intro">${visitedScenes.size} of ${ADVENTURE_SCENES.length} places explored · Personal best: ${bestHeartScore} hearts</p><h3>Badges</h3><ul class="collection-list">${achievementItems}</ul>`);
    }

    function showHelp() {
      const motionLabel = reducedMotion ? "Turn gentle motion on" : "Reduce motion";
      showInfoDialog("A little guide to the birthday world", `<p class="dialog-intro">This is a gift, not a checklist. Wander in any order, revisit any place, or skip a game whenever you like.</p><ul class="help-list"><li>Use the map button to return to the birthday world.</li><li>Games have pause, retry, and skip options.</li><li>Your badges and explored places stay saved on this device.</li><li>Photobooth pictures are saved only if you download them.</li><li>Sound is optional and starts only after you choose to enter.</li></ul><h3>More ways to celebrate</h3><div class="dialog-controls"><button class="pill secondary" type="button" data-dialog-action="secret-moon">🌙 Moon secret</button><button class="pill secondary" type="button" data-dialog-action="fullscreen">⛶ Fullscreen</button><button class="pill secondary" type="button" data-dialog-action="share">↗ Share</button><button class="pill secondary" type="button" data-dialog-action="wake">☀ Keep screen awake</button><button class="pill secondary" type="button" data-dialog-action="toggle-motion">${motionLabel}</button></div>`);
    }

    function settleSceneAnimations() {
      scene.querySelectorAll(".scene-card, .truck").forEach(element => element.classList.add("scene-static"));
    }

    function button(label, action, extra = "", disabled = false) {
      return `<button type="button" class="pill ${extra}" data-action="${action}"${disabled ? " disabled" : ""}>${label}</button>`;
    }

    function setupPhotobooth() {
      const video = document.getElementById("photoboothVideo");
      const placeholder = document.getElementById("photoboothPlaceholder");
      const canvas = document.getElementById("photoboothCanvas");
      if (!video || !placeholder || !canvas) return;
      video.hidden = true;
      canvas.hidden = true;
      placeholder.hidden = false;
      document.getElementById("photoboothFrame")?.classList.remove("photo-ready");
      const captureButton = scene.querySelector('[data-action="capture-photo"]');
      const retakeButton = scene.querySelector('[data-action="retake-photo"]');
      const downloadButton = scene.querySelector('[data-action="download-photo"]');
      if (captureButton) captureButton.disabled = true;
      if (retakeButton) retakeButton.disabled = true;
      if (downloadButton) downloadButton.disabled = true;
    }

    function stopPhotoboothCamera() {
      if (photoboothStream) {
        photoboothStream.getTracks().forEach(track => track.stop());
        photoboothStream = undefined;
      }
      const video = document.getElementById("photoboothVideo");
      if (video) video.srcObject = null;
    }

    function pausePhotoboothCamera() {
      if (!photoboothStream) return;
      stopPhotoboothCamera();
      const video = document.getElementById("photoboothVideo");
      const canvas = document.getElementById("photoboothCanvas");
      const placeholder = document.getElementById("photoboothPlaceholder");
      const status = document.getElementById("photoboothStatus");
      if (!video || !canvas || !placeholder || !status) return;
      video.hidden = true;
      if (canvas.hidden) {
        placeholder.hidden = false;
        scene.querySelector('[data-action="capture-photo"]').disabled = true;
        scene.querySelector('[data-action="retake-photo"]').disabled = true;
        scene.querySelector('[data-action="download-photo"]').disabled = true;
        status.textContent = "Camera paused while you were away. Start it again whenever you're ready.";
      }
    }

    function disposePhotobooth() {
      stopPhotoboothCamera();
      if (photoboothObjectUrl) {
        URL.revokeObjectURL(photoboothObjectUrl);
        photoboothObjectUrl = undefined;
      }
    }

    async function startPhotoboothCamera() {
      const video = document.getElementById("photoboothVideo");
      const placeholder = document.getElementById("photoboothPlaceholder");
      const canvas = document.getElementById("photoboothCanvas");
      const status = document.getElementById("photoboothStatus");
      if (!video || !placeholder || !canvas || !status) return;
      if (!navigator.mediaDevices?.getUserMedia) {
        status.textContent = "Camera access isn't available here. Choose a photo from your device instead.";
        return;
      }
      stopPhotoboothCamera();
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "user" } },
          audio: false
        });
        if (currentScene !== "memories") {
          stream.getTracks().forEach(track => track.stop());
          return;
        }
        photoboothStream = stream;
        video.srcObject = photoboothStream;
        await video.play();
        video.hidden = false;
        canvas.hidden = true;
        placeholder.hidden = true;
        document.getElementById("photoboothFrame")?.classList.remove("photo-ready");
        scene.querySelector('[data-action="capture-photo"]').disabled = false;
        scene.querySelector('[data-action="retake-photo"]').disabled = true;
        scene.querySelector('[data-action="download-photo"]').disabled = true;
        status.textContent = "Looking lovely! Tap Take photo when you're ready.";
      } catch (error) {
        stopPhotoboothCamera();
        console.info("The photobooth camera could not be started.", error);
        status.textContent = error.name === "NotAllowedError"
          ? "Camera permission was declined. You can still choose a photo from your device."
          : error.name === "NotFoundError"
            ? "No camera was found. Choose a photo from your device instead."
            : "The camera couldn't start. Choose a photo from your device instead.";
      }
    }

    function drawPhotoboothPhoto(source, mirror = false) {
      const canvas = document.getElementById("photoboothCanvas");
      const video = document.getElementById("photoboothVideo");
      const placeholder = document.getElementById("photoboothPlaceholder");
      const status = document.getElementById("photoboothStatus");
      if (!canvas || !placeholder || !status) return false;
      const context = canvas.getContext("2d");
      const sourceWidth = source.videoWidth || source.naturalWidth;
      const sourceHeight = source.videoHeight || source.naturalHeight;
      if (!context || !sourceWidth || !sourceHeight) {
        status.textContent = "That photo couldn't be opened. Try another image.";
        return false;
      }
      const width = canvas.width;
      const height = canvas.height;
      const photo = { x: 34, y: 120, width: 832, height: 876 };
      const scale = Math.max(photo.width / sourceWidth, photo.height / sourceHeight);
      const drawWidth = sourceWidth * scale;
      const drawHeight = sourceHeight * scale;
      const drawX = photo.x + (photo.width - drawWidth) / 2;
      const drawY = photo.y + (photo.height - drawHeight) / 2;

      context.clearRect(0, 0, width, height);
      const frameGradient = context.createLinearGradient(0, 0, width, height);
      frameGradient.addColorStop(0, "#f48da6");
      frameGradient.addColorStop(.52, "#dc6388");
      frameGradient.addColorStop(1, "#f4c76e");
      context.fillStyle = frameGradient;
      context.fillRect(0, 0, width, height);
      context.fillStyle = "#fff8e9";
      context.fillRect(18, 18, width - 36, height - 36);
      context.save();
      context.beginPath();
      context.rect(photo.x, photo.y, photo.width, photo.height);
      context.clip();
      if (mirror) {
        context.translate(photo.x * 2 + photo.width, 0);
        context.scale(-1, 1);
      }
      context.drawImage(source, drawX, drawY, drawWidth, drawHeight);
      context.restore();
      context.strokeStyle = "#ffffff";
      context.lineWidth = 12;
      context.strokeRect(photo.x, photo.y, photo.width, photo.height);
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#8b3f5b";
      context.font = "700 50px Fredoka, sans-serif";
      context.fillText(`HAPPY BIRTHDAY, ${CONFIG.NAME.toUpperCase()}!`, width / 2, 70, width - 70);
      context.fillStyle = "#684448";
      context.font = "600 34px 'DM Sans', sans-serif";
      context.fillText("A little moment to keep ✨", width / 2, 1060, width - 70);
      context.textAlign = "left";
      context.fillStyle = "#d95f82";
      context.font = "42px sans-serif";
      context.fillText("✦", 42, 70);
      context.textAlign = "right";
      context.fillText("✦", width - 42, 70);
      if (video) video.hidden = true;
      canvas.hidden = false;
      placeholder.hidden = true;
      document.getElementById("photoboothFrame")?.classList.add("photo-ready");
      scene.querySelector('[data-action="capture-photo"]').disabled = true;
      scene.querySelector('[data-action="retake-photo"]').disabled = false;
      scene.querySelector('[data-action="download-photo"]').disabled = false;
      status.textContent = "Your birthday photo is ready to download. It stays on this device.";
      return true;
    }

    function resetPhotobooth() {
      const video = document.getElementById("photoboothVideo");
      const canvas = document.getElementById("photoboothCanvas");
      const placeholder = document.getElementById("photoboothPlaceholder");
      const status = document.getElementById("photoboothStatus");
      if (!video || !canvas || !placeholder || !status) return;
      if (photoboothObjectUrl) {
        URL.revokeObjectURL(photoboothObjectUrl);
        photoboothObjectUrl = undefined;
      }
      canvas.hidden = true;
      document.getElementById("photoboothFrame")?.classList.remove("photo-ready");
      if (photoboothStream) {
        video.hidden = false;
        placeholder.hidden = true;
        scene.querySelector('[data-action="capture-photo"]').disabled = false;
        status.textContent = "Ready when you are. Tap Take photo to try again.";
      } else {
        video.hidden = true;
        placeholder.hidden = false;
        scene.querySelector('[data-action="capture-photo"]').disabled = true;
        status.textContent = "Start the camera or choose another photo to take a new picture.";
      }
      scene.querySelector('[data-action="retake-photo"]').disabled = true;
      scene.querySelector('[data-action="download-photo"]').disabled = true;
    }

    async function choosePhotoboothPhoto(file) {
      const status = document.getElementById("photoboothStatus");
      if (!status || !file) return;
      if (!file.type.startsWith("image/")) {
        status.textContent = "Choose an image file to use in the photobooth.";
        return;
      }
      stopPhotoboothCamera();
      if (photoboothObjectUrl) URL.revokeObjectURL(photoboothObjectUrl);
      photoboothObjectUrl = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => {
        if (drawPhotoboothPhoto(image)) {
          scene.querySelector('[data-action="capture-photo"]').disabled = true;
        }
        if (photoboothObjectUrl) {
          URL.revokeObjectURL(photoboothObjectUrl);
          photoboothObjectUrl = undefined;
        }
      };
      image.onerror = () => {
        status.textContent = "That photo couldn't be opened. Try another image.";
        if (photoboothObjectUrl) {
          URL.revokeObjectURL(photoboothObjectUrl);
          photoboothObjectUrl = undefined;
        }
      };
      image.src = photoboothObjectUrl;
    }

    function downloadPhotoboothPhoto() {
      const canvas = document.getElementById("photoboothCanvas");
      const status = document.getElementById("photoboothStatus");
      if (!canvas || canvas.hidden || !status) return;
      try {
        const download = document.createElement("a");
        download.href = canvas.toDataURL("image/png");
        download.download = `${CONFIG.NAME.toLowerCase()}-birthday-photobooth.png`;
        download.click();
      } catch (error) {
        console.info("The birthday photo could not be downloaded.", error);
        status.textContent = "The photo couldn't be downloaded. Please try taking it again.";
      }
    }

    function render() {
      const focusedElement = scene.dataset.renderedScene === currentScene ? document.activeElement : null;
      const focusAction = focusedElement?.dataset.action;
      const focusValue = focusedElement?.dataset.value;
      const focusTopping = focusedElement?.dataset.topping;
      window.clearInterval(noteTypingTimer);
      noteTypingTimer = undefined;
      clearGames();
      if (sceneScrollTrigger) sceneScrollTrigger.kill();
      sceneScrollTrigger = undefined;
      if (sceneObserver) sceneObserver.disconnect();
      sceneObserver = undefined;
      stopThreeCone();
      if (ADVENTURE_SCENES.includes(currentScene)) visitedScenes.add(currentScene);
      if (ADVENTURE_SCENES.every(item => visitedScenes.has(item))) awardBadge("world-explorer");
      updateProgress();
      const name = escapeHTML(CONFIG.NAME);
      const flavors = CONFIG.FLAVORS;
      const toppingsHTML = CONFIG.TOPPINGS.map((item, index) => `<button class="topping-chip" type="button" draggable="true" data-topping="${index}">${imageMarkup(item.asset, "topping-image", "")}<span>${escapeHTML(item.name)}</span></button>`).join("");
      const picked = selectedFlavors.map(index => flavors[index]);
      const configuredCone = configuredImage("cone");
      const configuredTruck = configuredImage("icecreamTruck");
      const configuredCake = configuredImage("cake");
      const configuredCandle = configuredImage("candle");
      const configuredSundae = configuredImage("sundae");
      const configuredJar = configuredImage("jar");
      let html = "";
      switch (currentScene) {
        case "envelope":
          html = `<div class="scene-card envelope-scene"><div class="scene-content">
            <p class="eyebrow">A little something, just for you</p>
            <div class="envelope-art" aria-hidden="true"><div class="envelope-letter">💌<span>For ${name}</span></div><div class="envelope-flap"></div><div class="envelope-seal">♥</div></div>
            <h1>A birthday letter is waiting</h1>
            <p class="lead">Made with care, a little bit of magic, and so many good wishes for you.</p>
            <div class="button-row">${button("Open your birthday letter 💌","open-envelope")}${button("Skip the animation","skip-envelope","secondary")}</div>
          </div></div>`;
          break;
        case "welcome":
          html = `<div class="scene-card"><div class="scene-content">
            <p class="eyebrow">A little surprise, made just for you</p>
            <div class="hero-cone" id="heroCone" aria-label="A floating ice cream cone">
              ${configuredCone ? imageMarkup("cone", "hero-cone-photo", "A real ice cream cone", "", configuredCone) : `<div class="hero-cone-fallback" aria-hidden="true"><span>🍓</span><span>🍦</span><b></b></div>`}
            </div>
            <div class="truck" aria-label="A pastel ice cream truck">
              ${configuredTruck ? `${imageMarkup("icecreamTruck", "truck-photo", "Ice cream truck", "", configuredTruck)}<button class="truck-photo-hit" type="button" data-action="begin" aria-label="Tap the truck window to begin"></button><button class="truck-horn" type="button" data-action="horn" aria-label="Honk the truck horn">📣</button>` : `
              <div class="truck-body"><div class="truck-sign" id="truckSign">${escapeHTML(name)}'s<br>Birthday Parlor</div><div class="truck-scoop">🍦</div><div class="truck-cab"><div class="truck-window"></div><button class="truck-window-hit" type="button" data-action="begin" aria-label="Tap the truck window to begin"></button></div></div>
              <button class="truck-horn" type="button" data-action="horn" aria-label="Honk the truck horn">📣</button>
              <div class="wheel one"></div><div class="wheel two"></div>`}
            </div>
            <h1 class="intro-name">Hi, ${name}!</h1>
            <p class="lead">The birthday truck brought a whole world of small surprises. Tap its window whenever you feel like exploring.</p>
            ${button("Step into your birthday world ✨","enter-world")}
            <p class="tiny-note">A gentle birthday soundtrack starts when you begin. Headphones make the sprinkles extra sparkly.</p>
          </div></div>`;
          break;
        case "hub":
          html = `<div class="scene-card world-scene"><div class="scene-content">
            <p class="eyebrow">A world of little birthday moments</p>
            <h1>Where shall we wander, ${name}?</h1>
            <p class="lead">Choose anything that catches your eye. There is no wrong order, and every door is already open.</p>
            <div class="world-map">${HUB_DESTINATIONS.map(item => `<button class="destination-card ${visitedScenes.has(item.scene) ? "visited" : ""}" type="button" data-action="go-scene" data-scene-target="${item.scene}"><span class="destination-icon" aria-hidden="true">${item.emoji}</span><span class="destination-copy"><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.note)}</small></span><span class="destination-status">${visitedScenes.has(item.scene) ? "Visit again" : "Explore"}</span></button>`).join("")}</div>
            <div class="hub-footer"><span>✨ ${visitedScenes.size} / ${ADVENTURE_SCENES.length} places explored</span><span>🏅 ${badges.size} little badges earned</span><button class="text-button" type="button" data-action="open-collection">See your badges</button></div>
          </div></div>`;
          break;
        case "cone":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 1 · Choose your vessel</p><h2>Every great scoop needs a home</h2><p class="lead">Pick the birthday cone (or cup) that feels most you.</p>
            <div class="choice-grid">
              ${[["waffle","🧇","Waffle cone","Classic & crunchy"],["sugar","🍦","Sugar cone","A little extra sweet"],["cup","🥣","Party cup","Room for everything"]].map(([id,emoji,title,copy]) => `<button type="button" class="choice-card ${selectedCone === id ? "selected" : ""}" aria-pressed="${selectedCone === id}" data-action="choose-cone" data-value="${id}"><span class="choice-emoji">${emoji}</span><strong>${title}</strong><small>${copy}</small></button>`).join("")}
            </div>
            ${button("That's the one! →","next-cone","",!selectedCone)}
          </div></div>`;
          break;
        case "flavors":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 2 · The flavor freezer</p><h2>Choose up to three scoops</h2><p class="lead">Each flavor has a tiny birthday truth tucked inside. Pick your favorites.</p>
            <div class="scoop-stack">${picked.length ? picked.map(flavor => `<span class="stack-scoop" style="background:${flavor.color}" title="${escapeHTML(flavor.name)}">${imageMarkup(flavor.asset, "scoop-image", "", flavor.color)}</span>`).join("") : `<span class="empty-stack">Your cone is waiting for its first scoop…</span>`}</div>
            <div class="flavor-grid">${flavors.map((flavor,index) => `<button type="button" class="flavor-card ${selectedFlavors.includes(index) ? "selected" : ""}" aria-pressed="${selectedFlavors.includes(index)}" data-action="flavor" data-value="${index}">${configuredImage(flavor.asset) ? imageMarkup(flavor.asset, "flavor-photo", "", flavor.color) : `<span class="flavor-emoji" aria-hidden="true">${escapeHTML(flavor.emoji)}</span>`}<strong>${escapeHTML(flavor.name)}</strong><small>${escapeHTML(flavor.note)}</small></button>`).join("")}</div>
            <p class="tiny-note">${picked.length} / 3 scoops chosen</p>${button("Stack them up! →","next-flavors","",picked.length === 0)}
          </div></div>`;
          break;
        case "toppings":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 3 · Toppings station</p><h2>Make it wonderfully extra</h2><p class="lead">Drag a topping onto your sundae, or tap a topping to add it. Pick chocolate drizzle, then swipe across your sundae to draw the sauce.</p>
            <div class="topping-layout"><div class="topping-tray">${toppingsHTML}</div>
              <div class="sundae-target" id="sundaeTarget" aria-label="Drop toppings here"><span class="sundae-art">${configuredSundae ? imageMarkup("sundae", "sundae-photo", "A birthday sundae", "", configuredSundae) : selectedCone === "cup" ? "🥣" : "🍦"}</span><svg class="sauce-art" viewBox="0 0 300 180" preserveAspectRatio="none" aria-hidden="true">${saucePaths.map(path => `<path d="${path}"></path>`).join("")}<path id="activeSaucePath"></path></svg>${toppings.map((emoji,index) => `<span class="topping-sticker" style="top:${15+(index%3)*16}%;left:${15+(index%4)*19}%">${emoji}</span>`).join("")}</div>
            </div><p class="tiny-note">${toppings.length ? `${toppings.length} topping${toppings.length === 1 ? "" : "s"} added — looking delicious!` : "Your sundae is ready for its sparkle."}</p>
            ${button("Perfect! Let's go →","next-toppings","",toppings.length === 0)}
          </div></div>`;
          break;
        case "melt":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 4 · A very important mission</p><h2>Don't let your birthday scoop melt!</h2><p class="lead">The sun is feeling extra sunny. Keep tapping the cool button to keep your scoop happy until the timer runs out.</p>
            <div class="melt-box"><div class="melt-emoji" id="meltEmoji">🍦</div><div class="meter" role="progressbar" aria-label="Scoop coolness" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100"><div class="meter-fill" id="meltMeter"></div></div><p id="meltStatus" class="tiny-note" aria-live="polite">Ready when you are — keep that coolness above zero!</p></div>
            <div class="button-row">${button("❄️ Keep it cool!","cool","mint",!meltInterval)}${button(meltInterval ? "Timer running…" : "Start the timer","start-melt","secondary",!!meltInterval)}</div>
          </div></div>`;
          break;
        case "catch":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A tiny heart-catching game</p><h2>Catch a little love</h2><p class="lead">Catch ten falling hearts in 30 seconds. Take a pause whenever you like, or skip the game and keep exploring.</p>
            <div class="game-stats"><span>💗 Hearts: <b id="catchScore">${catchScore}</b> / 10</span><span>⏱ <b id="catchTime">${catchTime}</b>s</span><span>🏆 Best: <b>${bestHeartScore}</b></span></div>
            <div class="game-area heart-game" id="gameArea"><div id="gameStart" class="game-start"><p>Catch ten hearts to earn a birthday badge.</p>${button(catchFinished ? "Play again 💗" : "Start catching hearts","start-catch")}${button("Skip to the next surprise →","skip-to-balloons","secondary")}</div></div>
            <div class="button-row game-controls">${button("Pause","pause-catch","secondary pause-control hidden",true)}${button("Continue to balloons →","skip-to-balloons","secondary")}</div>
            <p id="catchStatus" class="tiny-note" aria-live="polite">Ready when you are, birthday star.</p>
          </div></div>`;
          break;
        case "balloons":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A pocketful of kind words</p><h2>Pop a little surprise</h2><p class="lead">Every balloon is hiding a message for you. Pop them in any order; each one only rewards you once.</p>
            <p class="balloon-progress" id="balloonProgress" aria-live="polite">🎈 ${poppedBalloons.size} of ${CONFIG.BALLOONS.length} messages found</p>
            <div class="balloon-garden">${CONFIG.BALLOONS.map((message,index) => `<button class="balloon ${poppedBalloons.has(index) ? "popped" : ""}" type="button" data-action="pop-balloon" data-value="${index}" aria-pressed="${poppedBalloons.has(index)}" aria-label="${poppedBalloons.has(index) ? `Birthday message: ${escapeHTML(message)}` : `Pop surprise balloon ${index + 1}`}" ${poppedBalloons.has(index) ? "disabled" : ""}><span class="balloon-icon" aria-hidden="true">${poppedBalloons.has(index) ? "✨" : "🎈"}</span><span class="balloon-message">${poppedBalloons.has(index) ? escapeHTML(message) : "Tap to pop"}</span></button>`).join("")}</div>
            ${button("Keep wandering →","next-balloons","secondary")}
          </div></div>`;
          break;
        case "scratch":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 6 · A secret under the sprinkles</p><h2>Scratch for a birthday wish</h2><p class="lead">Rub the card with your finger (or mouse) to uncover your hidden message.</p>
            <div class="scratch-card"><div class="scratch-message">You make life sweeter!<span>May your birthday be filled with lovely little surprises ✨</span></div><canvas id="scratchCanvas" role="button" tabindex="0" aria-label="Scratch this card to reveal a birthday wish. Press Enter or Space to reveal it with the keyboard."></canvas></div>
            <p id="scratchHint" class="tiny-note">Scratch away about a third of the card to reveal your wish.</p>
            ${scratchPercent >= .27 ? button("Scratch it again","reset-scratch","secondary") : ""}
            ${button("The wish is revealed! →","next-scratch","",scratchPercent < .27)}
          </div></div>`;
          break;
        case "cake":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A quiet wish, before the next surprise</p><h2 id="cakeHeading">${candleOut ? `Happy Birthday, ${name}!` : `Make a birthday wish, ${name}`}</h2><p class="lead">Take a breath, make your wish, then tap to blow out the candle. Microphone access is optional.</p>
            <div class="cake-stage ${configuredCake ? "has-photo" : ""}">${configuredCake ? `${imageMarkup("cake", "cake-photo", "Birthday cake", "", configuredCake)}<div class="candle photo-candle">${configuredCandle ? imageMarkup("candle", "candle-photo", "Lit birthday candle") : ""}<span id="flame" class="flame ${candleOut ? "out" : ""}"></span></div>` : `<div class="cake"><div class="candle">${configuredCandle ? imageMarkup("candle", "candle-photo", "Lit birthday candle") : ""}<span id="flame" class="flame ${candleOut ? "out" : ""}"></span></div></div><div class="cake-plate"></div>`}</div>
            <div class="cake-actions">${button(candleOut ? "Wish made ✨" : "🌬️ Blow out the candle!","blow-candle","",candleOut)}${button("🎙️ Try microphone","start-mic","secondary",candleOut)}</div><p id="micStatus" class="mic-status">${candleOut ? "Your wish is on its way! Happy birthday! 🎂" : "Tap the candle button anytime. Microphone is optional."}</p>
            ${candleOut ? birthdayWishSaved ? `<p class="birthday-wish-kept">Your wish is tucked safely away: “${escapeHTML(birthdayWish)}”</p>` : `<form class="wish-form candle-wish-form" id="birthdayWishForm"><label for="birthdayWishInput">What are you wishing for this year?</label><input id="birthdayWishInput" maxlength="120" placeholder="A little hope for the year ahead…" value="${escapeHTML(birthdayWish)}" required>${button("Keep my wish ✨","submit-birthday-wish")}</form>` : ""}
            ${button("Open the birthday gift →","to-gift","",!candleOut)}
          </div></div>`;
          break;
        case "gift":
          html = `<div class="scene-card gift-scene"><div class="scene-content"><p class="eyebrow">Wrapped with love</p><h2>${giftOpened ? "A little reminder to keep" : "A birthday gift, just for you"}</h2><p class="lead">${giftOpened ? "Nothing fancy—just a note I hope you remember when you need it." : "Take your time. This one is yours to unwrap whenever you feel ready."}</p>
            <div class="gift-stage ${giftOpened ? "opened" : ""}" aria-live="polite"><div class="gift-box" aria-hidden="true"><span class="gift-lid"></span><span class="gift-ribbon"></span><span class="gift-bow">🎀</span>${giftOpened ? `<span class="gift-surprise">💖</span>` : "🎁"}</div>${giftOpened ? `<p class="gift-message">${escapeHTML(CONFIG.GIFT_NOTE)}</p>` : ""}</div>
            ${giftOpened ? button("Keep exploring →","next-memories") : button("Untie the ribbon 🎁","open-gift")}
          </div></div>`;
          break;
        case "memories":
          html = `<div class="scene-card photobooth-scene"><div class="scene-content"><p class="eyebrow">A little birthday memory</p><h2>Birthday photobooth</h2><p class="lead">Take a photo or choose one from your device, then save it with a birthday frame.</p>
            <div class="photobooth-actions">
              ${button("📷 Start camera","start-photo-camera","secondary")}
              ${button("Choose a photo","choose-photo","secondary")}
              ${button("Take photo","capture-photo","",true)}
              ${button("Retake","retake-photo","secondary",true)}
              ${button("Download photo","download-photo","",true)}
              <input id="photoboothUpload" class="screen-reader-only" type="file" accept="image/*" aria-label="Choose a photo from your device">
            </div>
            <div class="photobooth-frame" id="photoboothFrame" aria-label="Happy birthday photobooth frame">
              <video id="photoboothVideo" class="photobooth-media" autoplay playsinline muted hidden></video>
              <canvas id="photoboothCanvas" class="photobooth-media" width="900" height="1125" aria-label="Captured photo with a Happy Birthday ${escapeHTML(name)} frame" hidden></canvas>
              <div id="photoboothPlaceholder" class="photobooth-placeholder"><span aria-hidden="true">🎂</span><strong>Your birthday photo goes here</strong><small>Start the camera or choose a photo to begin.</small></div>
              <div class="photobooth-border" aria-hidden="true"><strong>Happy Birthday, ${escapeHTML(name)}!</strong><span>🎈　✨　🎂　✨　🎈</span></div>
            </div>
            <p id="photoboothStatus" class="tiny-note" aria-live="polite">Camera access is optional. Your photo stays on this device.</p>
            ${button("Keep exploring →","next-photobooth","")}
          </div></div>`;
          break;
        case "wish":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">Stop 9 · Sprinkle wish jar</p><h2>One last wish before the letters</h2><p class="lead">Type a wish for your new year. It will tumble into the jar and stay here just for you.</p>
            <form class="wish-form" id="wishForm">${wishSubmitted ? button("Now, the birthday letters 💌","to-note") : `<input id="wishInput" maxlength="120" placeholder="I wish for…" aria-label="Type your birthday wish" value="${escapeHTML(wishDraft)}" required>${button("Add my wish ✨","submit-wish")}`}</form>
            <div class="wish-jar ${configuredJar ? "has-photo" : ""}" id="wishJar" aria-label="Your wish jar">${configuredJar ? imageMarkup("jar", "jar-photo", "A glass jar ready for birthday wishes", "", configuredJar) : ""}<canvas id="wishCanvas" aria-hidden="true"></canvas><span id="wishJarText" class="wish-jar-text" aria-live="polite">${escapeHTML(wishSubmitted ? wishDraft : "")}</span></div><p id="wishStatus" class="tiny-note">${wishSubmitted ? "Your wish is tucked safely into the sprinkle jar. It stays on this device only. ✨" : "Your wish belongs to you. You don't have to share it."}</p>
          </div></div>`;
          break;
        case "note":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A quiet moment, just for you</p><h2>${ageLine} ${name} 🎂</h2><div class="message-paper typing-paper"><p id="noteText" aria-label="${escapeHTML(CONFIG.SHORT_NOTE)}"><span id="noteVisibleText">${noteComplete ? escapeHTML(CONFIG.SHORT_NOTE) : ""}</span><span class="screen-reader-only">${escapeHTML(CONFIG.SHORT_NOTE)}</span></p></div><p class="lead">Every word is yours to read at your own pace.</p><div class="button-row">${button(noteComplete ? "Open your birthday notes 💌" : "Skip the typing","skip-note")}${button("Back to the birthday world","go-hub","secondary")}</div></div></div>`;
          break;
        case "reasons":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A scoop for every reason</p><h2>Reasons you're the sweetest</h2><p class="lead">Tap every scoop to turn it over. Each one has a little reminder inside.</p>
            <div class="reason-grid">${CONFIG.REASONS.map((reason,index) => `<button type="button" class="reason-card ${revealedReasons.has(index) ? "revealed" : ""}" aria-label="${revealedReasons.has(index) ? `Reason: ${escapeHTML(reason)}` : `Reveal reason ${index + 1}`}" aria-pressed="${revealedReasons.has(index)}" data-action="reveal-reason" data-value="${index}"><span class="reason-front" aria-hidden="true">${["🍓","🍦","🍒","🧁","🍨","💖","🍡"][index % 7]}</span><span class="reason-back">${escapeHTML(reason)}</span></button>`).join("")}</div>
            <div class="button-row">${button("One last letter 💌","to-letter")}${button("Explore the world","go-hub","secondary")}</div>
          </div></div>`;
          break;
        case "letter":
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">A note, from the heart</p><h2>For you, ${name}</h2>
            <div class="message-paper"><div class="letter-lines">${CONFIG.LETTER.slice(0,letterLineIndex).map((line,index) => `<p class="letter-line" style="animation-delay:${index * .05}s">${escapeHTML(line)}</p>`).join("")}${letterLineIndex >= CONFIG.LETTER.length ? `<p class="letter-line letter-signature">With so much love,<br>${escapeHTML(CONFIG.SIGNATURE)}</p>` : ""}</div></div>
            <div class="button-row">${letterLineIndex < CONFIG.LETTER.length ? button(letterLineIndex === 0 ? "Read your letter ✨" : "And there's more…","reveal-line") : button("One more birthday surprise! 💖","finale")}${letterLineIndex < CONFIG.LETTER.length ? button("Read it all at once","reveal-all-letter","secondary") : ""}${button("Explore the birthday world","go-hub","secondary")}</div>
          </div></div>`;
          break;
        case "finale":
          awardBadge("story-finisher");
          html = `<div class="scene-card"><div class="scene-content"><p class="eyebrow">The end of the adventure, the start of a new year</p><div class="finale-heart" aria-hidden="true">💖</div><h1>Keep shining, ${name}!</h1><p class="lead">May your year be sprinkled with more joy than this little parlor can hold. Happy birthday — today and always.</p>
            <div class="finale-stats"><span>🗺️ ${visitedScenes.size} places explored</span><span>🏅 ${badges.size} badges earned</span><span>📸 Birthday photobooth</span><span>💗 Best heart score: ${bestHeartScore}</span></div>
            <div class="button-row">${button("Wander the world again","go-hub","secondary")}${button("Begin the birthday story again ↻","replay")}</div>
          </div></div>`;
          break;
      }
      if (previousScenes[currentScene]) {
        const closingTags = "</div></div>";
        const closingIndex = html.lastIndexOf(closingTags);
        if (closingIndex !== -1) {
          const previousButton = button("← Previous", "previous", "secondary");
          html = `${html.slice(0, closingIndex)}<div class="scene-navigation">${previousButton}</div>${html.slice(closingIndex)}`;
        }
      }
      scene.innerHTML = html;
      scene.dataset.renderedScene = currentScene;
      scene.dataset.scene = currentScene;
      if (currentScene === "memories") setupPhotobooth();
      document.getElementById("homeButton").hidden = ["envelope", "welcome", "hub"].includes(currentScene);
      if (document.hidden) settleSceneAnimations();
      if (focusAction) {
        const replacement = [...scene.querySelectorAll("[data-action]")].find(element =>
          element.dataset.action === focusAction && element.dataset.value === focusValue
        );
        replacement?.focus({ preventScroll: true });
      } else if (focusTopping !== undefined) {
        scene.querySelector(`[data-topping="${focusTopping}"]`)?.focus({ preventScroll: true });
      }
      if (currentScene === "scratch") setupScratch();
      if (currentScene === "toppings") setupToppingDrop();
      if (currentScene === "wish") {
        if (wishSubmitted) fillWishJar();
        else initWishCanvas();
      }
      if (currentScene === "note") startNoteTyping();
      if (currentScene === "welcome") initThreeCone();
      if (currentScene === "finale") sprinkleBurst(75);
      initSceneMotion();
      saveProgress();
    }

    function clearGames() {
      window.clearInterval(meltInterval); meltInterval = undefined;
      window.clearInterval(catchInterval); catchInterval = undefined;
      window.clearInterval(spawnInterval); spawnInterval = undefined;
    }

    function go(next, options = {}) {
      if (!SCENE_NAMES.includes(next)) {
        console.warn(`Unknown birthday scene "${next}" was not opened.`);
        return;
      }
      if (next === currentScene) return;
      if (!options.fromHistory && !options.noHistory) {
        sceneHistory.push(currentScene);
        if (sceneHistory.length > 40) sceneHistory.shift();
      }
      if (currentScene === "catch" && next !== "catch") catchPaused = false;
      if (currentScene === "memories" && next !== "memories") disposePhotobooth();
      sceneTransitionTimers.forEach(timer => window.clearTimeout(timer));
      sceneTransitionTimers.clear();
      if (currentScene === "cake" && next !== "cake") stopMicrophone();
      currentScene = next;
      if (next === "hub") awardBadge("world-wanderer");
      render();
      const heading = scene.querySelector("h1, h2");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
      }
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    }

    function setupAudio() {
      try {
        if (!audioContext) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (!AudioContextClass) { toastMessage("This browser doesn't support audio, but the birthday magic still works!"); return false; }
          audioContext = new AudioContextClass();
          masterGain = audioContext.createGain();
          masterGain.gain.value = volume;
          masterGain.connect(audioContext.destination);
        }
        if (audioContext.state === "suspended") audioContext.resume().catch(error => console.info("Audio could not resume.", error));
        return true;
      } catch (error) {
        console.info("Audio is unavailable; the birthday experience will continue silently.", error);
        return false;
      }
    }

    function tone(frequency, duration = .14, type = "sine", gainAmount = .16, delay = 0) {
      if (!setupAudio()) return;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const pentatonic = [261.63, 293.66, 329.63, 392, 440, 523.25, 587.33, 659.25, 783.99, 880, 1046.5];
      const candidates = pentatonic.flatMap(note => [note / 2, note, note * 2]);
      const pleasantFrequency = candidates.reduce((best, note) =>
        Math.abs(Math.log2(note / frequency)) < Math.abs(Math.log2(best / frequency)) ? note : best
      );
      oscillator.type = type;
      oscillator.frequency.value = pleasantFrequency;
      gain.gain.setValueAtTime(0, audioContext.currentTime + delay);
      gain.gain.linearRampToValueAtTime(gainAmount, audioContext.currentTime + delay + .012);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + delay + duration);
      oscillator.connect(gain); gain.connect(masterGain);
      oscillator.start(audioContext.currentTime + delay);
      oscillator.stop(audioContext.currentTime + delay + duration + .02);
    }

    function startMusic() {
      if (!setupAudio()) return;
      if (CONFIG.MUSIC_SRC) {
        try {
          if (window.Howl) {
            if (!musicAudio) musicAudio = new window.Howl({
              src: [CONFIG.MUSIC_SRC],
              loop: true,
              volume,
              onloaderror: () => toastMessage("Your music file couldn't load. The birthday sound effects are still here."),
              onplayerror: () => toastMessage("That music file couldn't play in this browser.")
            });
            musicAudio.volume(volume);
            musicAudio.play();
          } else {
            if (!musicAudio) { musicAudio = new Audio(CONFIG.MUSIC_SRC); musicAudio.loop = true; }
            musicAudio.volume = volume;
            musicAudio.play().catch(() => toastMessage("Your music file couldn't play. The birthday sound effects are still here."));
          }
        } catch (error) {
          console.info("Custom music is unavailable; using the built-in birthday sounds.", error);
          musicAudio = undefined;
          musicInterval = undefined;
          toastMessage("Your music file couldn't load, but the birthday sound effects are still here.");
        }
      } else if (!musicInterval) {
        const melody = [523.25,659.25,783.99,659.25,587.33,523.25,659.25,880,783.99,659.25,587.33,523.25,659.25,587.33,523.25,392];
        const chords = [
          [261.63,329.63,392,329.63],
          [196,246.94,293.66,246.94],
          [220,261.63,329.63,261.63],
          [174.61,220,261.63,220]
        ];
        const bassNotes = [130.81,98,110,87.31];
        let step = 0;
        musicInterval = window.setInterval(() => {
          if (!musicOn) return;
          const beat = step % 16;
          const chordIndex = Math.floor(beat / 4);
          tone(chords[chordIndex][beat % 4], .5, "sine", .032);
          if (beat % 2 === 0) tone(melody[beat], .56, "sine", .062, .015);
          if (beat % 4 === 0) tone(bassNotes[chordIndex], .85, "triangle", .04);
          step += 1;
        }, 560);
      }
      musicOn = true;
      musicToggle.textContent = "♫";
      musicToggle.setAttribute("aria-label", "Pause music");
      musicToggle.setAttribute("aria-pressed", "true");
    }

    function stopMusic() {
      musicOn = false;
      if (musicInterval) {
        window.clearInterval(musicInterval);
        musicInterval = undefined;
      }
      if (musicAudio) {
        if (window.Howl && musicAudio instanceof window.Howl) musicAudio.pause();
        else musicAudio.pause();
      }
      musicToggle.textContent = "♪";
      musicToggle.setAttribute("aria-label", "Play music");
      musicToggle.setAttribute("aria-pressed", "false");
    }

    function playBirthdaySong() {
      if (!setupAudio()) return;
      const notes = [
        [392,.28],[392,.28],[440,.52],[392,.52],[523.25,.52],[493.88,.9],
        [392,.28],[392,.28],[440,.52],[392,.52],[587.33,.52],[523.25,.9],
        [392,.28],[392,.28],[783.99,.52],[659.25,.52],[523.25,.52],[493.88,.52],[440,.9],
        [698.46,.28],[698.46,.28],[659.25,.52],[523.25,.52],[587.33,.52],[523.25,1]
      ];
      let delay = 0;
      notes.forEach(([frequency,duration]) => {
        tone(frequency, duration * .85, "triangle", .17, delay);
        delay += duration;
      });
    }

    function addTopping(index) {
      if (toppings.length >= 12) { toastMessage("Your sundae is officially extra!"); return; }
      toppings.push(CONFIG.TOPPINGS[index].emoji);
      if (CONFIG.TOPPINGS[index].name.toLowerCase().includes("drizzle")) {
        sauceMode = true;
        toastMessage("Chocolate drizzle ready! Swipe over your sundae. 🍫");
      }
      tone(650 + Math.random() * 280, .11, "triangle", .12);
      render();
    }

    function setupToppingDrop() {
      const target = document.getElementById("sundaeTarget");
      document.querySelectorAll(".topping-chip").forEach(chip => {
        chip.addEventListener("dragstart", event => event.dataTransfer.setData("text/plain", chip.dataset.topping));
        chip.addEventListener("click", () => addTopping(Number(chip.dataset.topping)));
      });
      target.addEventListener("dragover", event => { event.preventDefault(); target.classList.add("over"); });
      target.addEventListener("dragleave", () => target.classList.remove("over"));
      target.addEventListener("drop", event => {
        event.preventDefault();
        target.classList.remove("over");
        const index = Number(event.dataTransfer.getData("text/plain"));
        if (Number.isInteger(index) && CONFIG.TOPPINGS[index]) addTopping(index);
      });
      let drawingSauce = false;
      let currentPath = "";
      const saucePath = () => document.getElementById("activeSaucePath");
      const saucePoint = event => {
        const bounds = target.getBoundingClientRect();
        return {
          x: Math.max(0, Math.min(300, (event.clientX - bounds.left) / bounds.width * 300)),
          y: Math.max(0, Math.min(180, (event.clientY - bounds.top) / bounds.height * 180))
        };
      };
      target.addEventListener("pointerdown", event => {
        if (!sauceMode) return;
        event.preventDefault();
        target.setPointerCapture(event.pointerId);
        drawingSauce = true;
        const point = saucePoint(event);
        currentPath = `M ${point.x} ${point.y}`;
        saucePath().setAttribute("d", currentPath);
      });
      target.addEventListener("pointermove", event => {
        if (!drawingSauce) return;
        if (currentPath.length >= 4000) return;
        const point = saucePoint(event);
        currentPath += ` L ${point.x} ${point.y}`;
        saucePath().setAttribute("d", currentPath);
      });
      const finishSauce = () => {
        if (!drawingSauce) return;
        drawingSauce = false;
        if (currentPath.includes(" L ")) {
          saucePaths.push(currentPath);
          sauceMode = false;
          saucePath().removeAttribute("id");
          toastMessage("A perfect chocolate swirl! 🍫");
        }
      };
      target.addEventListener("pointerup", finishSauce);
      target.addEventListener("pointercancel", finishSauce);
    }

    function startMelt() {
      if (meltInterval) return;
      meltTimer = 12; meltCool = 100;
      const meter = document.getElementById("meltMeter");
      const emoji = document.getElementById("meltEmoji");
      const coolButton = document.querySelector('[data-action="cool"]');
      const start = document.querySelector('[data-action="start-melt"]');
      if (meter) meter.style.width = "100%";
      if (emoji) emoji.textContent = "🍦";
      if (coolButton) coolButton.disabled = false;
      if (start) start.disabled = true;
      const status = document.getElementById("meltStatus");
      if (status) status.textContent = "Keep tapping the snowflake! ❄️";
      meltInterval = window.setInterval(() => {
        if (document.hidden) return;
        meltTimer -= 1;
        meltCool = Math.max(0, meltCool - 10);
        const meter = document.getElementById("meltMeter");
        const emoji = document.getElementById("meltEmoji");
        if (meter) meter.style.width = `${meltCool}%`;
        const meterTrack = meter?.parentElement;
        if (meterTrack) meterTrack.setAttribute("aria-valuenow", String(meltCool));
        if (emoji) emoji.textContent = meltCool < 35 ? "🥺🍦" : "🍦";
        if (meltCool <= 0) {
          clearGames();
          if (status) status.textContent = "Uh-oh, a little melty! Give it another try — you've got this.";
          const coolButton = document.querySelector('[data-action="cool"]');
          const startButton = document.querySelector('[data-action="start-melt"]');
          if (coolButton) coolButton.disabled = true;
          if (startButton) { startButton.disabled = false; startButton.textContent = "Try again"; }
        } else if (meltTimer <= 0) {
          clearGames();
          if (status) status.textContent = "Perfectly chilled! Your scoop survived the sunshine. 🍦";
          toastMessage("Scoop saved! You're a coolness expert.");
          scheduleSceneTransition("melt", "catch", 1300);
        }
      }, 1000);
    }

    function coolScoop() {
      if (!meltInterval) { toastMessage("Start the timer first, then tap to keep your scoop cool!"); return; }
      meltCool = Math.min(100, meltCool + 18);
      const meter = document.getElementById("meltMeter");
      if (meter) meter.style.width = `${meltCool}%`;
      const meterTrack = meter?.parentElement;
      if (meterTrack) meterTrack.setAttribute("aria-valuenow", String(meltCool));
      tone(820, .12, "sine", .1);
    }

    function pauseCatch() {
      if (!catchInterval || currentScene !== "catch") return;
      window.clearInterval(catchInterval);
      window.clearInterval(spawnInterval);
      catchInterval = undefined;
      spawnInterval = undefined;
      catchPaused = true;
      document.querySelectorAll("#gameArea .falling").forEach(item => item.remove());
      const start = document.getElementById("gameStart");
      if (start) {
        start.classList.remove("hidden");
        start.innerHTML = `<p>Your score and time are safe. Resume whenever you're ready.</p>${button("Resume catching","start-catch")}`;
      }
      const pause = document.querySelector('[data-action="pause-catch"]');
      if (pause) { pause.classList.add("hidden"); pause.disabled = true; }
      const status = document.getElementById("catchStatus");
      if (status) status.textContent = "Game paused. Your hearts are waiting.";
    }

    function startCatch() {
      if (catchInterval) return;
      if (!catchPaused) {
        catchScore = 0;
        catchTime = 30;
        catchFinished = false;
      }
      if (document.hidden) {
        catchPaused = true;
        const start = document.getElementById("gameStart");
        if (start) {
          start.classList.remove("hidden");
          start.innerHTML = `<p>Your score and time are safe. Resume when the page is active.</p>${button("Resume catching","start-catch")}`;
        }
        const status = document.getElementById("catchStatus");
        if (status) status.textContent = "Game paused. Your hearts are waiting.";
        return;
      }
      catchPaused = false;
      document.getElementById("gameStart")?.classList.add("hidden");
      const pause = document.querySelector('[data-action="pause-catch"]');
      if (pause) { pause.classList.remove("hidden"); pause.disabled = false; }
      const score = document.getElementById("catchScore");
      if (score) score.textContent = String(catchScore);
      const time = document.getElementById("catchTime");
      if (time) time.textContent = String(catchTime);
      const status = document.getElementById("catchStatus");
      if (status) status.textContent = "Tap each heart as it floats by!";
      spawnInterval = window.setInterval(() => {
        const area = document.getElementById("gameArea");
        if (!area || currentScene !== "catch" || document.hidden) return;
        const heart = document.createElement("button");
        heart.className = "falling heart-target";
        heart.type = "button";
        heart.dataset.action = "catch-heart";
        heart.setAttribute("aria-label", "Catch this heart");
        heart.textContent = ["💗","💖","💕","💝"][Math.floor(Math.random() * 4)];
        heart.style.left = `${5 + Math.random() * 82}%`;
        heart.style.animationDuration = `${2.7 + Math.random() * 1.4}s`;
        area.appendChild(heart);
        window.setTimeout(() => heart.remove(), 4300);
      }, 650);
      catchInterval = window.setInterval(() => {
        if (document.hidden) return;
        catchTime -= 1;
        const timeEl = document.getElementById("catchTime");
        if (timeEl) timeEl.textContent = String(catchTime);
        if (catchTime <= 0) finishCatch(catchScore >= 10);
      }, 1000);
    }

    function finishCatch(won) {
      clearGames();
      catchPaused = false;
      catchFinished = true;
      document.querySelectorAll(".falling").forEach(item => item.remove());
      const pause = document.querySelector('[data-action="pause-catch"]');
      if (pause) { pause.classList.add("hidden"); pause.disabled = true; }
      const status = document.getElementById("catchStatus");
      if (won) {
        bestHeartScore = Math.max(bestHeartScore, catchScore);
        if (status) status.textContent = "You caught ten hearts! Keep that birthday love. 💗";
        awardBadge("heart-catcher");
      } else {
        bestHeartScore = Math.max(bestHeartScore, catchScore);
        if (status) status.textContent = "Every heart counts. Take a breath, try again, or skip ahead.";
      }
      const start = document.getElementById("gameStart");
      if (start) {
        start.classList.remove("hidden");
        start.innerHTML = `<p>${won ? "You did it! The birthday world is cheering for you." : "So close—your next try might be the one."}</p>${button(won ? "Play again 💗" : "Try again 💗","start-catch")}`;
      }
      saveProgress();
    }

    function setupScratch() {
      const canvas = document.getElementById("scratchCanvas");
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);
      scratchContext = canvas.getContext("2d", { willReadFrequently: true });
      const hint = document.getElementById("scratchHint");
      const next = document.querySelector('[data-action="next-scratch"]');
      if (!scratchContext || !rect.width || !rect.height) {
        scratchPercent = 1;
        if (hint) hint.textContent = "The scratch effect isn't available here, so your birthday wish is ready.";
        if (next) next.disabled = false;
        return;
      }
      scratchContext.scale(ratio, ratio);
      const gradient = scratchContext.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "#f5b7c5"); gradient.addColorStop(.5, "#d7c6f2"); gradient.addColorStop(1, "#f2cd84");
      scratchContext.fillStyle = gradient;
      scratchContext.fillRect(0, 0, rect.width, rect.height);
      scratchContext.fillStyle = "#fff8f1";
      scratchContext.font = "600 21px Fredoka, sans-serif";
      scratchContext.textAlign = "center";
      scratchContext.fillText("✨ RUB TO REVEAL ✨", rect.width / 2, rect.height / 2);
      scratchContext.globalCompositeOperation = "destination-out";
      let drawing = false;
      let scratchCount = 0;
      const revealAll = () => {
        scratchContext.clearRect(0, 0, rect.width, rect.height);
        scratchPercent = 1;
        if (hint) hint.textContent = "You uncovered your wish! Keep it safe in your heart. 💖";
        if (next) next.disabled = false;
        saveProgress();
      };
      const scratch = event => {
        const box = canvas.getBoundingClientRect();
        const x = event.clientX - box.left;
        const y = event.clientY - box.top;
        scratchContext.beginPath();
        scratchContext.arc(x, y, 23, 0, Math.PI * 2);
        scratchContext.fill();
        scratchCount += 1;
        if (scratchCount % 8 === 0) {
          let pixels;
          try {
            pixels = scratchContext.getImageData(0, 0, canvas.width, canvas.height).data;
          } catch (error) {
            console.info("The scratch card could not be inspected; keyboard reveal remains available.", error);
            revealAll();
            return;
          }
          let transparent = 0;
          let sampled = 0;
          for (let i = 3; i < pixels.length; i += 64) {
            sampled++;
            if (pixels[i] < 60) transparent++;
          }
          scratchPercent = sampled ? transparent / sampled : 0;
          if (scratchPercent >= .27) {
            if (hint) hint.textContent = "You uncovered your wish! Keep it safe in your heart. 💖";
            if (next) next.disabled = false;
            saveProgress();
          }
        }
      };
      canvas.addEventListener("pointerdown", event => { drawing = true; canvas.setPointerCapture(event.pointerId); scratch(event); });
      canvas.addEventListener("pointermove", event => { if (drawing) scratch(event); });
      canvas.addEventListener("pointerup", () => { drawing = false; });
      canvas.addEventListener("pointercancel", () => { drawing = false; });
      canvas.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          revealAll();
        }
      });
      if (scratchPercent >= .27) revealAll();
    }

    function submitWish() {
      const input = document.getElementById("wishInput");
      const value = input.value.trim();
      if (!value) { input.focus(); return; }
      wishDraft = value.slice(0, 120);
      wishSubmitted = true;
      fillWishJar();
      const wishText = document.getElementById("wishJarText");
      if (wishText) wishText.textContent = wishDraft;
      const status = document.getElementById("wishStatus");
      status.textContent = "Your wish is tucked safely into the sprinkle jar. It stays on this device only. ✨";
      const form = document.getElementById("wishForm");
      form.innerHTML = button("Now, the birthday letters 💌","to-note");
      tone(880, .28, "triangle", .14);
      awardBadge("wish-maker");
      saveProgress();
    }

    function submitBirthdayWish() {
      const input = document.getElementById("birthdayWishInput");
      const value = input.value.trim();
      if (!value) { input.focus(); return; }
      birthdayWish = value.slice(0, 120);
      birthdayWishSaved = true;
      saveProgress();
      render();
    }

    function sprinkleBurst(count = 40) {
      buzz([14, 24, 18]);
      if (typeof window.confetti === "function") {
        try {
          window.confetti({
            particleCount: Math.min(count * 2, window.innerWidth < 600 ? 90 : 150),
            spread: 78,
            startVelocity: 30,
            origin: { y: .65 },
            colors: ["#f48da6", "#f3c76e", "#a9dec9", "#a9d8ec", "#d6a5de"],
            disableForReducedMotion: reducedMotion
          });
          return;
        } catch (error) {
          console.info("Confetti library unavailable; using the native sprinkle animation.", error);
        }
      }
      const colors = ["🍓","🌈","✨","⭐","💖","🍬","🍒","🧁"];
      if (reducedMotion) return;
      for (let i = 0; i < Math.min(count, window.innerWidth < 600 ? 32 : 60); i++) {
        const piece = document.createElement("span");
        piece.className = "sparkle";
        piece.textContent = colors[Math.floor(Math.random() * colors.length)];
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.animationDuration = `${2.2 + Math.random() * 2.6}s`;
        piece.style.animationDelay = `${Math.random() * .8}s`;
        piece.style.fontSize = `${12 + Math.random() * 18}px`;
        document.body.appendChild(piece);
        window.setTimeout(() => piece.remove(), 6000);
      }
    }

    function extinguishCandle() {
      if (currentScene !== "cake") return;
      stopMicrophone();
      const flame = document.getElementById("flame");
      const heading = document.getElementById("cakeHeading");
      const blowButton = document.querySelector('[data-action="blow-candle"]');
      const nextButton = document.querySelector('[data-action="to-gift"]');
      const status = document.getElementById("micStatus");
      if (!flame || flame.classList.contains("out")) return;
      candleOut = true;
      flame.classList.add("out");
      if (heading) heading.textContent = `Happy Birthday, ${CONFIG.NAME}!`;
      if (blowButton) { blowButton.textContent = "✨ Make another wish come true ✨"; blowButton.disabled = true; }
      if (nextButton) nextButton.disabled = false;
      if (status) status.textContent = "Your wish is on its way! Happy birthday! 🎂";
      sprinkleBurst(58);
      playBirthdaySong();
      saveProgress();
      render();
    }

    scene.addEventListener("click", event => {
      const target = event.target.closest("[data-action]");
      if (!target || target.disabled) return;
      const action = target.dataset.action;
      if (window.gsap && target.classList.contains("pill")) window.gsap.fromTo(target, { scale: .94 }, { scale: 1, duration: .55, ease: "elastic.out(1,.38)" });
      hasInteracted = true;
      buzz(10);
      switch (action) {
        case "begin":
        case "enter-world":
          startMusic(); requestMotionAccess(); tone(660, .15, "triangle", .14); go("hub"); break;
        case "open-envelope":
        case "skip-envelope":
          go("welcome"); break;
        case "go-scene":
          go(target.dataset.sceneTarget); break;
        case "go-hub":
          go("hub"); break;
        case "open-collection":
          showCollection(); break;
        case "previous":
          {
            const previous = sceneHistory.pop() || previousScenes[currentScene];
            if (previous) go(previous, { fromHistory: true });
          }
          break;
        case "horn":
          hornTaps++;
          tone(220, .2, "square", .08);
          toastMessage(hornTaps >= 3 ? "The truck driver says: you're the best passenger ever! 🍦" : "Toot toot! The birthday truck is here!");
          if (hornTaps >= 3) hornTaps = 0;
          break;
        case "choose-cone":
          selectedCone = target.dataset.value;
          saveProgress();
          tone(440, .08, "triangle", .08);
          document.querySelectorAll(".choice-card").forEach(card => {
            const selected = card.dataset.value === selectedCone;
            card.classList.toggle("selected", selected);
            card.setAttribute("aria-pressed", String(selected));
          });
          document.querySelector('[data-action="next-cone"]').disabled = false;
          break;
        case "next-cone": go("flavors"); break;
        case "flavor": {
          const index = Number(target.dataset.value);
          if (selectedFlavors.includes(index)) selectedFlavors = selectedFlavors.filter(item => item !== index);
          else if (selectedFlavors.length < 3) selectedFlavors.push(index);
          else { toastMessage("Three scoops is the perfect birthday stack!"); break; }
          tone(560, .1, "sine", .11); render(); break;
        }
        case "next-flavors": go("toppings"); break;
        case "next-toppings":
          if (toppings.length) awardBadge("sundae-artist");
          go("melt"); break;
        case "start-melt": startMelt(); break;
        case "cool": coolScoop(); break;
        case "start-catch": startCatch(); break;
        case "pause-catch": pauseCatch(); break;
        case "skip-to-balloons": go("balloons"); break;
        case "catch-heart":
          catchScore++;
          document.getElementById("catchScore").textContent = String(catchScore);
          target.remove();
          tone(700 + catchScore * 35, .11, "sine", .12);
          if (catchScore >= 10) finishCatch(true);
          break;
        case "next-balloons": go("scratch"); break;
        case "pop-balloon": {
          const index = Number(target.dataset.value);
          if (!Number.isInteger(index) || index < 0 || index >= CONFIG.BALLOONS.length || poppedBalloons.has(index)) break;
          poppedBalloons.add(index);
          target.classList.add("popped");
          target.disabled = true;
          target.setAttribute("aria-pressed", "true");
          target.setAttribute("aria-label", `Birthday message: ${CONFIG.BALLOONS[index]}`);
          target.innerHTML = `<span class="balloon-icon" aria-hidden="true">✨</span><span class="balloon-message">${escapeHTML(CONFIG.BALLOONS[index])}</span>`;
          document.getElementById("balloonProgress").textContent = `🎈 ${poppedBalloons.size} of ${CONFIG.BALLOONS.length} messages found`;
          if (poppedBalloons.size === CONFIG.BALLOONS.length) awardBadge("balloon-buddy");
          saveProgress();
          break;
        }
        case "reset-scratch":
          scratchPercent = 0;
          render();
          break;
        case "next-scratch": go("cake"); break;
        case "blow-candle":
          extinguishCandle();
          break;
        case "start-mic": startMicrophone(); break;
        case "submit-birthday-wish": event.preventDefault(); submitBirthdayWish(); break;
        case "to-gift": go("gift"); break;
        case "open-gift":
          if (!giftOpened) {
            giftOpened = true;
            awardBadge("gift-opener");
            render();
          }
          break;
        case "next-memories": go("memories"); break;
        case "start-photo-camera":
          startPhotoboothCamera();
          break;
        case "choose-photo":
          document.getElementById("photoboothUpload")?.click();
          break;
        case "capture-photo": {
          const video = document.getElementById("photoboothVideo");
          if (!video?.srcObject || !video.videoWidth) {
            document.getElementById("photoboothStatus").textContent = "Start the camera and wait for the preview before taking a photo.";
            break;
          }
          drawPhotoboothPhoto(video, true);
          break;
        }
        case "retake-photo":
          resetPhotobooth();
          break;
        case "download-photo":
          downloadPhotoboothPhoto();
          break;
        case "next-photobooth": go("wish"); break;
        case "submit-wish": event.preventDefault(); submitWish(); break;
        case "to-note": go("note"); break;
        case "skip-note":
          if (noteComplete) { go("reasons"); break; }
          window.clearInterval(noteTypingTimer);
          noteTypingTimer = undefined;
          noteComplete = true;
          document.getElementById("noteVisibleText").textContent = CONFIG.SHORT_NOTE;
          target.textContent = "Open your birthday notes 💌";
          saveProgress();
          break;
        case "to-reasons": go("reasons"); break;
        case "reveal-reason":
          if (revealedReasons.has(Number(target.dataset.value))) break;
          revealedReasons.add(Number(target.dataset.value));
          saveProgress();
          target.classList.add("revealed");
          target.setAttribute("aria-pressed", "true");
          target.setAttribute("aria-label", `Reason: ${CONFIG.REASONS[Number(target.dataset.value)]}`);
          tone(570, .13, "sine", .1);
          sprinkleBurst(12);
          if (revealedReasons.size >= CONFIG.REASONS.length) {
            toastMessage("Every scoop has a reminder: you are so loved. 💖");
          }
          break;
        case "to-letter": go("letter"); break;
        case "reveal-line":
          letterLineIndex++;
          if (letterLineIndex > CONFIG.LETTER.length) letterLineIndex = CONFIG.LETTER.length;
          tone(560 + letterLineIndex * 35, .14, "sine", .08); render(); break;
        case "reveal-all-letter":
          letterLineIndex = CONFIG.LETTER.length;
          render();
          break;
        case "finale": go("finale"); break;
        case "replay":
          selectedCone = ""; selectedFlavors = []; toppings = []; saucePaths = []; sauceMode = false;
          wishDraft = ""; wishSubmitted = false; giftOpened = false; candleOut = false; birthdayWish = ""; birthdayWishSaved = false; noteComplete = false;
          scratchPercent = 0; meltTimer = 12; meltCool = 100; catchScore = 0; catchTime = 30; catchFinished = false;
          letterLineIndex = 0; revealedReasons = new Set(); sceneHistory = [];
          window.clearTimeout(toastTimer);
          toast.classList.remove("show");
          toast.textContent = "";
          go("envelope", { noHistory: true }); break;
      }
    });

    scene.addEventListener("submit", event => {
      if (event.target.id === "wishForm") {
        event.preventDefault();
        submitWish();
      } else if (event.target.id === "birthdayWishForm") {
        event.preventDefault();
        submitBirthdayWish();
      }
    });
    scene.addEventListener("input", event => {
      if (event.target.id === "wishInput") wishDraft = event.target.value.slice(0, 120);
      if (event.target.id === "birthdayWishInput") birthdayWish = event.target.value.slice(0, 120);
    });
    scene.addEventListener("change", event => {
      if (event.target.id !== "photoboothUpload") return;
      choosePhotoboothPhoto(event.target.files?.[0]);
      event.target.value = "";
    });
    document.getElementById("musicToggle").addEventListener("click", () => {
      if (musicOn) stopMusic();
      else startMusic();
    });
    volumeSlider.addEventListener("input", () => {
      volume = Number(volumeSlider.value);
      if (masterGain) masterGain.gain.setTargetAtTime(volume, audioContext.currentTime, .04);
      if (musicAudio) {
        if (window.Howl && musicAudio instanceof window.Howl) musicAudio.volume(volume);
        else musicAudio.volume = volume;
      }
    });
    document.getElementById("homeButton").addEventListener("click", () => go("hub"));
    document.getElementById("collectionButton").addEventListener("click", showCollection);
    document.getElementById("helpButton").addEventListener("click", showHelp);
    document.getElementById("moreButton").addEventListener("click", showHelp);
    const infoDialog = document.getElementById("infoDialog");
    infoDialog.addEventListener("click", event => {
      const action = event.target.closest("[data-dialog-action]");
      if (!action) return;
      if (action.dataset.dialogAction === "toggle-motion") {
        reducedMotion = !reducedMotion;
        document.body.classList.toggle("reduce-motion", reducedMotion);
        try { localStorage.setItem(motionPreferenceKey, String(reducedMotion)); }
        catch (error) { console.info("Motion preference could not be saved.", error); }
        showHelp();
      } else {
        const controls = {
          "secret-moon": "moonButton",
          fullscreen: "fullscreenButton",
          share: "shareButton",
          wake: "wakeButton"
        };
        const id = controls[action.dataset.dialogAction];
        if (id) {
          infoDialog.close();
          document.getElementById(id).click();
        }
      }
    });
    document.getElementById("moonButton").addEventListener("click", () => {
      moonTaps++;
      if (moonTaps >= 3) {
        moonTaps = 0;
        toastMessage(`${CONFIG.NAME}, even the moon came out to celebrate you. 🌙💖`);
        sprinkleBurst(24);
      } else toastMessage("The moon is keeping a little birthday secret… tap it again! 🌙");
    });
    document.getElementById("fullscreenButton").addEventListener("click", async event => {
      try {
        if (!document.fullscreenElement) {
          if (!document.documentElement.requestFullscreen) throw new Error("Fullscreen is not supported.");
          await document.documentElement.requestFullscreen();
          event.currentTarget.setAttribute("aria-label", "Exit fullscreen");
          event.currentTarget.setAttribute("aria-pressed", "true");
        } else {
          await document.exitFullscreen();
          event.currentTarget.setAttribute("aria-label", "Enter fullscreen");
          event.currentTarget.setAttribute("aria-pressed", "false");
        }
      } catch (error) {
        toastMessage("Fullscreen isn't available here, but the birthday parlor still works beautifully.");
      }
    });
    document.addEventListener("fullscreenchange", () => {
      const button = document.getElementById("fullscreenButton");
      const active = Boolean(document.fullscreenElement);
      button.setAttribute("aria-label", active ? "Exit fullscreen" : "Enter fullscreen");
      button.setAttribute("aria-pressed", String(active));
    });
    document.getElementById("shareButton").addEventListener("click", async () => {
      const shareData = { title: document.title, text: "I got this birthday gift! A little ice-cream birthday adventure for Lieam.", url: location.protocol === "file:" ? undefined : location.href };
      try {
        if (navigator.share) await navigator.share(shareData);
        else if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(`${shareData.text}${shareData.url ? ` ${shareData.url}` : ""}`);
        else throw new Error("Sharing and clipboard APIs are unavailable.");
        toastMessage("Birthday gift ready to share! 💌");
      } catch (error) {
        if (error.name === "AbortError") return;
        toastMessage("Sharing isn't available in this browser. You can still show Lieam this page!");
      }
    });
    const wakeButton = document.getElementById("wakeButton");
    wakeButton.addEventListener("click", async () => {
      try {
        if (wakeLock) {
          await wakeLock.release();
          wakeLock = undefined;
          wakeButton.setAttribute("aria-pressed", "false");
          toastMessage("Screen wake lock released.");
        } else if ("wakeLock" in navigator) {
          wakeLock = await navigator.wakeLock.request("screen");
          wakeButton.setAttribute("aria-pressed", "true");
          wakeLock.addEventListener("release", () => {
            wakeLock = undefined;
            wakeButton.setAttribute("aria-pressed", "false");
          }, { once: true });
          toastMessage("Screen will stay awake while you enjoy the birthday parlor. ☀️");
        } else {
          throw new Error("Wake Lock API is unsupported.");
        }
      } catch (error) {
        toastMessage("Keep-awake isn't available here. Your adventure will still be right here.");
      }
    });
    document.addEventListener("visibilitychange", async () => {
      if (document.hidden) {
        settleSceneAnimations();
        pauseCatch();
        if (currentScene === "memories") pausePhotoboothCamera();
        restoreMusicOnVisibility = musicOn;
        if (musicOn) stopMusic();
        if (threeFrame) {
          cancelAnimationFrame(threeFrame);
          threeFrame = 0;
        }
        if (audioContext && audioContext.state === "running") {
          try { await audioContext.suspend(); } catch (error) { console.info("Audio could not pause in the background.", error); }
        }
        if (micStream) stopMicrophone();
      } else {
        if (restoreMusicOnVisibility) startMusic();
        if (currentScene === "welcome") {
          if (threeResume) threeResume();
          else initThreeCone();
        }
        if (currentScene === "wish") initWishCanvas();
      }
    });
    window.addEventListener("pagehide", disposePhotobooth);
    window.addEventListener("pointermove", event => {
      if (reducedMotion) return;
      const now = performance.now();
      if (now - lastTrailAt < 35) return;
      if (event.pointerType === "touch" ? Math.random() > .1 : Math.random() > .35) return;
      lastTrailAt = now;
      const sprinkle = document.createElement("span");
      sprinkle.className = "trail-sprinkle";
      sprinkle.style.left = `${event.clientX}px`;
      sprinkle.style.top = `${event.clientY}px`;
      sprinkle.style.background = ["#f48da6","#f3c76e","#a9dec9","#a9d8ec"][Math.floor(Math.random() * 4)];
      const trail = document.getElementById("sprinkleTrail");
      if (trail.childElementCount >= 24) trail.firstElementChild.remove();
      trail.appendChild(sprinkle);
      window.setTimeout(() => sprinkle.remove(), 550);
    }, { passive: true });
    window.addEventListener("keydown", event => {
      if (event.key === "Escape" && document.activeElement?.tagName !== "INPUT") document.activeElement.blur();
    });
    restoreProgress();
    render();
    const loadingScreen = document.getElementById("loadingScreen");
    loadingScreen.classList.add("done");
    window.addEventListener("beforeunload", stopMicrophone);
    });

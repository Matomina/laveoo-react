import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { siteData } from "../data/siteData";
import { vehicles } from "../data/vehicles";
import { supabase } from "../lib/supabaseClient";

const WEB3FORMS_ACCESS_KEY = "2aef2f48-9238-48a3-ba23-a989714ee633";

const CATEGORY_TO_PLAN_ID = {
    1: "citadines",
    2: "compactes-berlines-suv-compacts",
    3: "suv-familiaux-monospaces-breaks",
};

const normalize = (text) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

function generateTimeSlots() {
    const slots = [];
    for (let hour = 8; hour <= 19; hour++) {
        slots.push(`${hour}h`);
        if (hour < 19) slots.push(`${hour}h30`);
    }
    return slots;
}

const TIME_SLOTS = generateTimeSlots();

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MONTHS = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

function makeEmptyVehicle(categoryId) {
    return {
        uid: Math.random().toString(36).slice(2),
        categoryId: categoryId ?? "",
        option1h: false,
    };
}

function StepBar({ step, maxStepReached, onGoTo }) {
    const steps = [
        { id: 1, label: "Véhicule(s)" },
        { id: 2, label: "Coordonnées" },
        { id: 3, label: "Récapitulatif" },
    ];

    return (
        <div className="mx-auto mb-10 flex max-w-xl items-center justify-between">
            {steps.map((item, index) => {
                const isActive = item.id === step;
                const isDone = item.id < step;
                const isClickable = item.id <= maxStepReached;
                return (
                    <div key={item.id} className="flex flex-1 items-center">
                        <button
                            type="button"
                            disabled={!isClickable}
                            onClick={() => isClickable && onGoTo(item.id)}
                            className={`flex flex-col items-center gap-2 ${isClickable ? "cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                        >
                            <span
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black transition ${
                                    isActive
                                        ? "bg-[#1F3A5F] text-white shadow-[0_8px_20px_rgba(31,58,95,0.3)]"
                                        : isDone
                                          ? "bg-[#1769E8] text-white"
                                          : "border-2 border-[#93B8D8] bg-white text-[#93B8D8]"
                                }`}
                            >
                                {isDone ? "✓" : item.id}
                            </span>
                            <span className={`text-xs font-bold ${isActive ? "text-[#1F3A5F]" : "text-[#595959]"}`}>
                                {item.label}
                            </span>
                        </button>
                        {index < steps.length - 1 && (
                            <div className={`mx-2 h-0.5 flex-1 ${item.id < step ? "bg-[#1769E8]" : "bg-[#93B8D8]/40"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function Calendar({ selectedDate, onSelect }) {
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);
    const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7; // Lundi = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    for (let i = 0; i < firstDayIndex; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const goPrevMonth = () => {
        const prev = new Date(year, month - 1, 1);
        if (prev.getFullYear() === today.getFullYear() && prev.getMonth() < today.getMonth()) return;
        if (prev < new Date(today.getFullYear(), today.getMonth(), 1)) return;
        setViewDate(prev);
    };
    const goNextMonth = () => setViewDate(new Date(year, month + 1, 1));

    const isPast = (day) => {
        const cellDate = new Date(year, month, day);
        return cellDate < today;
    };

    const isSelected = (day) => {
        if (!selectedDate) return false;
        const cellDate = new Date(year, month, day);
        return (
            cellDate.getFullYear() === selectedDate.getFullYear() &&
            cellDate.getMonth() === selectedDate.getMonth() &&
            cellDate.getDate() === selectedDate.getDate()
        );
    };

    const isBeforeCurrentMonth =
        year === today.getFullYear() && month === today.getMonth();

    return (
        <div className="rounded-2xl border border-[#93B8D8]/40 bg-white p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={goPrevMonth}
                    disabled={isBeforeCurrentMonth}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#93B8D8]/50 text-[#1F3A5F] transition hover:bg-[#EAF2FB] disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label="Mois précédent"
                >
                    ←
                </button>
                <p className="font-black text-[#1F3A5F]">
                    {MONTHS[month]} {year}
                </p>
                <button
                    type="button"
                    onClick={goNextMonth}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#93B8D8]/50 text-[#1F3A5F] transition hover:bg-[#EAF2FB]"
                    aria-label="Mois suivant"
                >
                    →
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#595959]">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="py-1">{day}</div>
                ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1">
                {cells.map((day, index) => {
                    if (day === null) return <div key={`empty-${index}`} />;
                    const disabled = isPast(day);
                    const selected = isSelected(day);
                    return (
                        <button
                            key={day}
                            type="button"
                            disabled={disabled}
                            onClick={() => onSelect(new Date(year, month, day))}
                            className={`aspect-square rounded-xl text-sm font-semibold transition ${
                                disabled
                                    ? "cursor-not-allowed text-[#93B8D8]/40"
                                    : selected
                                      ? "bg-[#1F3A5F] text-white shadow-[0_6px_16px_rgba(31,58,95,0.3)]"
                                      : "text-[#1F3A5F] hover:bg-[#EAF2FB]"
                            }`}
                        >
                            {day}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function VehicleQuickSearch({ onFound }) {
    const [search, setSearch] = useState("");
    const query = normalize(search);

    const suggestions =
        query.length >= 2
            ? vehicles
                  .filter((item) => {
                      const model = normalize(item.model);
                      const brand = normalize(item.brand);
                      const fullName = normalize(`${item.brand} ${item.model}`);
                      return model.includes(query) || brand.includes(query) || fullName.includes(query);
                  })
                  .sort((a, b) => normalize(a.model).localeCompare(normalize(b.model)))
                  .slice(0, 5)
            : [];

    const select = (item) => {
        setSearch(`${item.brand} ${item.model}`);
        onFound(CATEGORY_TO_PLAN_ID[item.category]);
    };

    return (
        <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-4">
            <p className="text-xs font-bold text-[#1F3A5F]/70">Vous ne connaissez pas la catégorie ? Entrez votre modèle :</p>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Exemple : Peugeot 308"
                className="mt-2 w-full rounded-xl border border-[#1F3A5F]/15 bg-white px-4 py-2.5 text-sm font-medium text-[#1F3A5F] outline-none focus:border-[#1769E8]"
            />
            {suggestions.length > 0 && (
                <div className="mt-2 flex flex-col gap-1.5">
                    {suggestions.map((item) => (
                        <button
                            key={`${item.brand}-${item.model}`}
                            type="button"
                            onClick={() => select(item)}
                            className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-left text-sm font-semibold text-[#1F3A5F] transition hover:bg-[#1F3A5F] hover:text-white"
                        >
                            {item.brand} {item.model}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function AddressAutocomplete({ value, onChange }) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceRef = useRef(null);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (text) => {
        onChange(text);
        setShowSuggestions(true);

        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (text.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(text)}&limit=5`
                );
                const data = await response.json();
                setSuggestions(data.features ?? []);
            } catch (error) {
                setSuggestions([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const selectSuggestion = (feature) => {
        onChange(feature.properties.label);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div ref={wrapperRef} className="relative">
            <input
                type="text"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Numéro, rue, ville"
                autoComplete="off"
                className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
            />
            {showSuggestions && (loading || suggestions.length > 0) && (
                <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-[#93B8D8]/40 bg-white shadow-[0_14px_34px_rgba(31,58,95,0.15)]">
                    {loading && (
                        <p className="px-4 py-3 text-sm text-[#595959]">Recherche en cours...</p>
                    )}
                    {!loading &&
                        suggestions.map((feature) => (
                            <button
                                key={feature.properties.id}
                                type="button"
                                onClick={() => selectSuggestion(feature)}
                                className="block w-full px-4 py-2.5 text-left text-sm font-medium text-[#1F3A5F] transition hover:bg-[#EAF2FB]"
                            >
                                {feature.properties.label}
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}

export default function ReservationPage() {
    const [searchParams] = useSearchParams();
    const { pricing } = siteData;
    const plans = pricing.items;

    const preselectedId = searchParams.get("vehicule");
    const preselectedPlan = plans.find((p) => p.id === preselectedId);

    const [step, setStep] = useState(preselectedPlan ? 2 : 1);
    const [maxStepReached, setMaxStepReached] = useState(preselectedPlan ? 2 : 1);

    const [vehiclesList, setVehiclesList] = useState([
        makeEmptyVehicle(preselectedPlan ? preselectedPlan.id : plans[0]?.id),
    ]);

    const [form, setForm] = useState({ nom: "", adresse: "", email: "", telephone: "" });
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const stepBarRef = useRef(null);

    useEffect(() => {
        if (!stepBarRef.current) return;
        const rect = stepBarRef.current.getBoundingClientRect();
        const offset = window.scrollY + rect.top - 90; // 90px pour la hauteur du header sticky
        window.scrollTo({ top: offset, behavior: "smooth" });
    }, [step]);

    const goToStep = (target) => {
        setStep(target);
        setMaxStepReached((current) => Math.max(current, target));
    };

    const updateVehicle = (uid, patch) => {
        setVehiclesList((list) => list.map((v) => (v.uid === uid ? { ...v, ...patch } : v)));
    };

    const addVehicle = () => {
        setVehiclesList((list) => [...list, makeEmptyVehicle(plans[0]?.id)]);
    };

    const removeVehicle = (uid) => {
        setVehiclesList((list) => (list.length > 1 ? list.filter((v) => v.uid !== uid) : list));
    };

    const getPlan = (categoryId) => plans.find((p) => p.id === categoryId);

    const vehicleTotal = (vehicle) => {
        const plan = getPlan(vehicle.categoryId);
        if (!plan) return 0;
        return plan.price + (vehicle.option1h ? pricing.option.price : 0);
    };

    const totalPrice = vehiclesList.reduce((sum, v) => sum + vehicleTotal(v), 0);

    const canGoToStep2 = vehiclesList.every((v) => v.categoryId);
    const canGoToStep3 =
        form.nom.trim() &&
        form.adresse.trim() &&
        form.email.trim() &&
        form.telephone.trim() &&
        selectedDate &&
        selectedSlot;

    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
        : "";

    const handleSubmit = async () => {
        setSubmitting(true);
        setSubmitError(false);

        const vehiclesSummary = vehiclesList
            .map((v, index) => {
                const plan = getPlan(v.categoryId);
                return `Véhicule ${index + 1} : ${plan?.shortLabel ?? ""} (${plan?.price ?? 0} €)${v.option1h ? " + option +1h (39 €)" : ""}`;
            })
            .join("\n");

        const message = `Nouvelle demande de réservation Laveoo\n\n${vehiclesSummary}\n\nTotal estimé : ${totalPrice} €\n\nNom : ${form.nom}\nAdresse d'intervention : ${form.adresse}\nEmail : ${form.email}\nTéléphone : ${form.telephone}\nDate souhaitée : ${formattedDate}\nCréneau souhaité : ${selectedSlot}`;

        const vehiculesPayload = vehiclesList.map((v) => {
            const plan = getPlan(v.categoryId);
            return {
                plan: plan?.shortLabel ?? "",
                prix: plan?.price ?? 0,
                option1h: v.option1h,
            };
        });

        supabase
            .from("reservations")
            .insert({
                nom: form.nom,
                email: form.email,
                telephone: form.telephone,
                adresse: form.adresse,
                date_souhaitee: selectedDate ? selectedDate.toISOString().slice(0, 10) : null,
                creneau: selectedSlot,
                vehicules: vehiculesPayload,
                total_estime: totalPrice,
            })
            .then(({ error }) => {
                if (error) console.error("Erreur enregistrement Supabase :", error);
            });

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    subject: "Nouvelle demande de réservation - Laveoo",
                    from_name: "Laveoo - Site web",
                    name: form.nom,
                    email: form.email,
                    telephone: form.telephone,
                    adresse: form.adresse,
                    date_souhaitee: formattedDate,
                    creneau_souhaite: selectedSlot,
                    total_estime: `${totalPrice} €`,
                    message,
                }),
            });

            const result = await response.json();
            if (result.success) {
                setSubmitted(true);
            } else {
                setSubmitError(true);
            }
        } catch (error) {
            setSubmitError(true);
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <>
                <Seo title="Demande envoyée | Laveoo" description="Votre demande de réservation a bien été envoyée à Laveoo." path="/reservation" />
                <section className="bg-white py-24">
                    <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EAF2FB] text-4xl">✓</div>
                        <h1 className="mt-6 text-3xl font-black text-[#1F3A5F] sm:text-4xl">Votre demande a bien été envoyée</h1>
                        <p className="mt-4 text-lg leading-8 text-[#595959]">
                            Merci {form.nom} ! Nous revenons vers vous très rapidement par téléphone ou SMS pour confirmer votre rendez-vous du {formattedDate}, créneau {selectedSlot}.
                        </p>
                        <p className="mt-4 rounded-2xl bg-[#EAF2FB] p-4 text-sm font-semibold text-[#1F3A5F]">
                            Aucun paiement en ligne n'est nécessaire — vous réglez directement après la prestation, une fois votre véhicule propre.
                        </p>
                        <a href="/" className="premium-button mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-4 font-semibold text-white">Retour à l'accueil</a>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Seo title="Réserver en ligne | Laveoo" description="Réservez votre nettoyage automobile à domicile en quelques clics. Choisissez votre véhicule, votre créneau, et payez uniquement après la prestation." path="/reservation" />
            <PageHero eyebrow="Réservation en ligne" title="Réservez votre nettoyage auto à domicile" intro="Choisissez votre ou vos véhicules, indiquez vos coordonnées et le créneau souhaité. Le paiement s'effectue uniquement après la prestation." />

            <section className="bg-[#F5F5F5] py-16 lg:py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div ref={stepBarRef}>
                        <StepBar step={step} maxStepReached={maxStepReached} onGoTo={goToStep} />
                    </div>

                    {/* ── ÉTAPE 1 : VÉHICULES ── */}
                    {step === 1 && (
                        <div className="space-y-6">
                            {vehiclesList.map((vehicle, index) => {
                                const plan = getPlan(vehicle.categoryId);
                                return (
                                    <div key={vehicle.uid} className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Véhicule {index + 1}</p>
                                            {vehiclesList.length > 1 && (
                                                <button type="button" onClick={() => removeVehicle(vehicle.uid)} className="text-sm font-semibold text-[#595959] underline hover:text-[#1F3A5F]">
                                                    Retirer
                                                </button>
                                            )}
                                        </div>

                                        <VehicleQuickSearch onFound={(categoryId) => updateVehicle(vehicle.uid, { categoryId })} />

                                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                            {plans.map((p) => (
                                                <button
                                                    key={p.id}
                                                    type="button"
                                                    onClick={() => updateVehicle(vehicle.uid, { categoryId: p.id })}
                                                    className={`rounded-2xl border-2 p-4 text-left transition ${
                                                        vehicle.categoryId === p.id
                                                            ? "border-[#1769E8] bg-[#EAF2FB]"
                                                            : "border-[#93B8D8]/40 bg-white hover:border-[#93B8D8]"
                                                    }`}
                                                >
                                                    <p className="text-sm font-bold text-[#1F3A5F]">{p.shortLabel}</p>
                                                    <p className="mt-1 text-2xl font-black text-[#102A59]">{p.price} €</p>
                                                </button>
                                            ))}
                                        </div>

                                        {plan && (
                                            <div className="mt-4 rounded-2xl bg-[#F8FAFC] p-4">
                                                <label className="flex cursor-pointer items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={vehicle.option1h}
                                                        onChange={(e) => updateVehicle(vehicle.uid, { option1h: e.target.checked })}
                                                        className="h-5 w-5 accent-[#1769E8]"
                                                    />
                                                    <span className="flex-1 text-sm font-semibold text-[#1F3A5F]">
                                                        Option +1 heure de prestation
                                                    </span>
                                                    <span className="font-black text-[#1769E8]">+{pricing.option.price} €</span>
                                                </label>
                                                <p className="mt-2 pl-8 text-xs leading-5 text-[#595959]">
                                                    Recommandée pour un véhicule très sale : le technicien dispose de plus de temps pour repasser plusieurs fois sur les zones difficiles et obtenir un meilleur rendu.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <button
                                type="button"
                                onClick={addVehicle}
                                className="w-full rounded-2xl border-2 border-dashed border-[#93B8D8]/60 bg-white p-4 text-sm font-bold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-[#EAF2FB]"
                            >
                                + Ajouter un véhicule
                            </button>

                            <div className="rounded-2xl bg-[#1F3A5F] p-5 text-white">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">Total estimé</p>
                                    <p className="text-2xl font-black">{totalPrice} €</p>
                                </div>
                                <p className="mt-1 text-xs font-medium text-white/70">Tous frais inclus, déplacement compris — à régler sur place une fois la prestation terminée.</p>
                            </div>

                            <button
                                type="button"
                                disabled={!canGoToStep2}
                                onClick={() => goToStep(2)}
                                className="premium-button inline-flex min-h-14 w-full items-center justify-center rounded-full bg-[#1769E8] px-8 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(23,105,232,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Continuer
                            </button>
                        </div>
                    )}

                    {/* ── ÉTAPE 2 : COORDONNÉES ── */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Vos coordonnées</p>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <label className="text-sm font-semibold text-[#1F3A5F]">Nom et prénom</label>
                                        <input
                                            type="text"
                                            value={form.nom}
                                            onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                                            className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                                        />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="text-sm font-semibold text-[#1F3A5F]">Adresse d'intervention</label>
                                        <AddressAutocomplete
                                            value={form.adresse}
                                            onChange={(value) => setForm((f) => ({ ...f, adresse: value }))}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-[#1F3A5F]">E-mail</label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                            className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-semibold text-[#1F3A5F]">Téléphone</label>
                                        <input
                                            type="tel"
                                            value={form.telephone}
                                            onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                                            className="mt-1.5 w-full rounded-xl border border-[#93B8D8]/50 bg-[#F8FAFC] px-4 py-3 outline-none focus:border-[#1769E8] focus:bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Date souhaitée</p>
                                <div className="mt-4">
                                    <Calendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                                </div>
                            </div>

                            <div className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Créneau souhaité</p>
                                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                                    {TIME_SLOTS.map((slot) => (
                                        <button
                                            key={slot}
                                            type="button"
                                            onClick={() => setSelectedSlot(slot)}
                                            className={`rounded-xl border-2 p-3 text-sm font-bold transition ${
                                                selectedSlot === slot
                                                    ? "border-[#1769E8] bg-[#EAF2FB] text-[#1F3A5F]"
                                                    : "border-[#93B8D8]/40 bg-white text-[#595959] hover:border-[#93B8D8]"
                                            }`}
                                        >
                                            {slot}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => goToStep(1)}
                                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white px-6 py-4 text-base font-bold text-[#1F3A5F]"
                                >
                                    Retour
                                </button>
                                <button
                                    type="button"
                                    disabled={!canGoToStep3}
                                    onClick={() => goToStep(3)}
                                    className="premium-button inline-flex min-h-14 flex-[2] items-center justify-center rounded-full bg-[#1769E8] px-8 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(23,105,232,0.25)] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Voir le récapitulatif
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── ÉTAPE 3 : RÉCAPITULATIF ── */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <div className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Véhicule(s)</p>
                                    <button type="button" onClick={() => goToStep(1)} className="text-sm font-semibold text-[#1769E8] underline">Modifier</button>
                                </div>
                                <div className="mt-4 space-y-3">
                                    {vehiclesList.map((v, index) => {
                                        const plan = getPlan(v.categoryId);
                                        return (
                                            <div key={v.uid} className="flex items-center justify-between rounded-xl bg-[#F8FAFC] px-4 py-3">
                                                <p className="text-sm font-semibold text-[#1F3A5F]">
                                                    Véhicule {index + 1} — {plan?.shortLabel}
                                                    {v.option1h && <span className="text-[#595959]"> (+1h)</span>}
                                                </p>
                                                <p className="font-black text-[#102A59]">{vehicleTotal(v)} €</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <p className="font-black text-[#1F3A5F]">Total estimé</p>
                                    <p className="text-2xl font-black text-[#1769E8]">{totalPrice} €</p>
                                </div>
                                <p className="mt-1 text-xs font-medium text-[#595959]">Tous frais inclus, déplacement compris — à régler sur place une fois la prestation terminée.</p>

                                <button
                                    type="button"
                                    onClick={() => {
                                        addVehicle();
                                        goToStep(1);
                                    }}
                                    className="mt-4 w-full rounded-xl border-2 border-dashed border-[#93B8D8]/60 bg-white p-3 text-sm font-bold text-[#1F3A5F] transition hover:border-[#1769E8] hover:bg-[#EAF2FB]"
                                >
                                    + Ajouter un véhicule
                                </button>
                            </div>

                            <div className="rounded-[1.75rem] border border-[#93B8D8]/50 bg-white p-6 shadow-[0_12px_34px_rgba(31,58,95,0.06)]">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-black uppercase tracking-[0.14em] text-[#1F3A5F]/60">Coordonnées et créneau</p>
                                    <button type="button" onClick={() => goToStep(2)} className="text-sm font-semibold text-[#1769E8] underline">Modifier</button>
                                </div>
                                <dl className="mt-4 space-y-2 text-sm">
                                    <div className="flex justify-between"><dt className="text-[#595959]">Nom</dt><dd className="font-semibold text-[#1F3A5F]">{form.nom}</dd></div>
                                    <div className="flex justify-between"><dt className="text-[#595959]">Adresse</dt><dd className="font-semibold text-[#1F3A5F]">{form.adresse}</dd></div>
                                    <div className="flex justify-between"><dt className="text-[#595959]">E-mail</dt><dd className="font-semibold text-[#1F3A5F]">{form.email}</dd></div>
                                    <div className="flex justify-between"><dt className="text-[#595959]">Téléphone</dt><dd className="font-semibold text-[#1F3A5F]">{form.telephone}</dd></div>
                                    <div className="flex justify-between"><dt className="text-[#595959]">Date</dt><dd className="font-semibold capitalize text-[#1F3A5F]">{formattedDate}</dd></div>
                                    <div className="flex justify-between"><dt className="text-[#595959]">Créneau</dt><dd className="font-semibold text-[#1F3A5F]">{selectedSlot}</dd></div>
                                </dl>
                            </div>

                            <div className="rounded-2xl bg-[#EAF2FB] p-5 text-center">
                                <p className="font-bold text-[#1F3A5F]">💳 Aucun paiement en ligne</p>
                                <p className="mt-1 text-sm text-[#595959]">Vous réglez directement après la prestation, une fois votre véhicule propre.</p>
                            </div>

                            {submitError && (
                                <p className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
                                    Une erreur est survenue lors de l'envoi. Vous pouvez réessayer, ou nous contacter directement par téléphone.
                                </p>
                            )}

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => goToStep(2)}
                                    className="inline-flex min-h-14 flex-1 items-center justify-center rounded-full border border-[#1F3A5F]/15 bg-white px-6 py-4 text-base font-bold text-[#1F3A5F]"
                                >
                                    Retour
                                </button>
                                <button
                                    type="button"
                                    disabled={submitting}
                                    onClick={handleSubmit}
                                    className="premium-button inline-flex min-h-14 flex-[2] items-center justify-center rounded-full bg-[#1F3A5F] px-8 py-4 text-base font-bold text-white shadow-[0_14px_34px_rgba(31,58,95,0.25)] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? "Envoi en cours..." : "Confirmer ma demande"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
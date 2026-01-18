"use client";

import { Location } from "@/app/generated/prisma/client";
import { useEditableField } from "@/hooks/useEditableField";
import { updateLocationTitle } from "@/lib/actions/itinerary-updates";
import { useIntlayer } from "next-intlayer";
import { Cormorant_Garamond } from "next/font/google";
import SortableActivities from "../activity/SortableActivities";

export interface LocationWithActivities extends Location {
    activities?: Array<{ id: string }>;
}

interface ItineraryItemProps {
    item: LocationWithActivities;
    tripId: string;
    editable?: boolean;
}

const cormorant = Cormorant_Garamond({
    weight: ["300", "400", "500"],
    subsets: ["latin"],
    display: "swap",
});

export default function ItineraryItem({
    item,
    tripId,
    editable = true,
}: ItineraryItemProps) {
    const content = useIntlayer("itinerary");
    const activitiesCount = item.activities?.length || 0;

    const {
        isEditing,
        value,
        isSaving,
        inputRef,
        setValue,
        startEditing,
        handleKeyDown,
        handleBlur,
    } = useEditableField({
        initialValue: item.locationTitle || "",
        onSave: async (newTitle) => {
            await updateLocationTitle(item.id, newTitle);
        },
        enabled: editable,
    });

    const textStyle = {
        fontSize: "3rem",
        lineHeight: 1.3,
        color: "#111",
        fontWeight: 300,
    };

    const autoResize = (el: HTMLTextAreaElement) => {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
    };

    return (
        <section className="relative z-10">
            <div className="flex items-start gap-10 mb-16">
                {/* Badge Jour */}
                <div className="w-[120px] h-[120px] rounded-full border border-gray-900 flex flex-col items-center justify-center shrink-0 bg-white">
                    <span className="text-[10px] font-bold uppercase tracking-[2px]">
                        {content.day}
                    </span>
                    <span className="font-logo text-4xl italic leading-none">
                        {String(item.order + 1).padStart(2, "0")}
                    </span>
                </div>

                <div className="flex-1">
                    {isEditing && editable ? (
                        <textarea
                            ref={(el) => {
                                if (el) {
                                    inputRef.current = el;
                                    autoResize(el);
                                }
                            }}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                autoResize(e.target);
                            }}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            disabled={isSaving}
                            className={cormorant.className}
                            style={{
                                ...textStyle,
                                width: "100%",
                                border: "none",
                                outline: "none",
                                resize: "none",
                                background: "transparent",
                                minHeight: "60px",
                                opacity: isSaving ? 0.6 : 1,
                            }}
                            placeholder="Titre de la journée"
                            autoFocus
                        />
                    ) : (
                        <div
                            onClick={startEditing}
                            className={`${cormorant.className} ${editable
                                    ? "cursor-text hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                                    : ""
                                }`}
                            style={textStyle}
                        >
                            {value || "Titre de la journée"}
                        </div>
                    )}
                    {editable && isEditing && !isSaving && (
                        <p className="text-sm text-gray-400 mt-2">
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Échap</kbd> pour annuler •
                            <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">Ctrl+Enter</kbd> pour sauvegarder
                        </p>
                    )}

                    <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
                        ({activitiesCount}{" "}
                        {activitiesCount > 1 ? content.activities : content.activity})
                    </span>
                </div>
            </div>

            <SortableActivities tripId={tripId} locationId={item.id} />
        </section>
    );
}

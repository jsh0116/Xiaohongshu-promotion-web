"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { submitLead } from "@shared/api/submitLead";
import { isValidEmail } from "@entities/lead";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { cn } from "@shared/lib/cn";
import type { UserType } from "@shared/types";

interface LeadFormProps {
  onSuccess: () => void;
}

export function LeadForm({ onSuccess }: LeadFormProps) {
  const t = useTranslations("form");
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState<UserType>("biz");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!isValidEmail(email)) {
      setEmailError(t("emailError"));
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.set("email", email);
      formData.set("userType", userType);

      // localStorage에서 survey 응답 읽기
      const surveyResponse = localStorage.getItem("surveyResponse");
      if (surveyResponse) {
        formData.set("surveyResponse", surveyResponse);
      }

      const result = await submitLead(formData);
      if (result.ok) {
        setSubmitted(true);
        // 성공 후 localStorage 정리
        localStorage.removeItem("surveyResponse");
        setTimeout(() => onSuccess(), 300);
      } else {
        setEmailError(t("emailError"));
      }
    });
  };

  if (submitted) {
    return (
      <div className="text-center py-8" data-testid="form-success">
        <div className="text-5xl mb-4">🎉</div>
        <p className="text-xl font-semibold text-zinc-900 dark:text-white">
          {t("success")}
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          {t("successSub")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" data-testid="lead-form">
      {/* User type toggle */}
      <div>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          {t("typeLabel")}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {(["biz", "inf"] as UserType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setUserType(type)}
              className={cn(
                "py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all break-keep",
                userType === type
                  ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                  : "border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600",
              )}
              data-testid={`user-type-${type}`}
            >
              {type === "biz" ? t("typeBiz") : t("typeInf")}
            </button>
          ))}
        </div>
      </div>

      {/* Email input */}
      <Input
        id="email"
        type="email"
        label={t("emailLabel")}
        placeholder={t("emailPlaceholder")}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
        error={emailError}
        data-testid="email-input"
        autoComplete="email"
      />

      <Button
        type="submit"
        size="lg"
        loading={isPending}
        className="w-full"
        data-testid="submit-btn"
      >
        {isPending ? t("submitting") : t("submit")}
      </Button>

      <p className="text-center text-xs text-zinc-400 dark:text-zinc-500">
        {t("privacy")}
      </p>
    </form>
  );
}

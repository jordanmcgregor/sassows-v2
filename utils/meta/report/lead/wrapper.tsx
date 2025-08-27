"use client"
import { useEffect } from "react"
import { reportMetaLeadFunction } from "@/utils/meta/report/lead/function"

export default function ReportMetaLead() {
  useEffect(() => {
    reportMetaLeadFunction()
  }, [])

  return null
}